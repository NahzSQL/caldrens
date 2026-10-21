/**
 * End-to-end checks: run against a running server.
 *   npm run build && npm start   (in one terminal)
 *   npm run test:e2e             (in another)
 * Set BASE_URL to test another address (default http://localhost:3000).
 * Set SCREENSHOTS=dir to save full-page screenshots.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const SHOTS = process.env.SCREENSHOTS;
const executablePath = fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;

const pages = [
  "/",
  "/about",
  "/services",
  "/services/preventive-dentistry",
  "/services/crowns-and-bridges",
  "/patient-information",
  "/contact",
  "/privacy-policy",
  "/accessibility",
  "/this-page-does-not-exist",
];
const viewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  desktop: { width: 1440, height: 900 },
};

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);
const check = (ok, good, bad) => (ok ? pass(good) : fail(bad));

const browser = await chromium.launch(executablePath ? { executablePath } : {});

async function newPage(viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // Remote photos may be blocked in sandboxed environments; the layout falls back gracefully.
    if (m.type() === "error" && !/images\.unsplash\.com|Failed to load resource/.test(m.text())) errors.push(m.text());
  });
  return { page, context, errors };
}

// 1. Every page, every viewport: status, title, h1, overflow, console errors.
console.log("Pages and layouts");
for (const [name, viewport] of Object.entries(viewports)) {
  for (const path of pages) {
    const { page, context, errors } = await newPage(viewport);
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    const expected = path.includes("does-not-exist") ? 404 : 200;
    if (res.status() !== expected) fail(`${name} ${path}: status ${res.status()}`);
    const h1 = await page.locator("h1").count();
    if (h1 !== 1) fail(`${name} ${path}: expected one h1, found ${h1}`);
    const title = await page.title();
    if (!title.includes("Evercrest")) fail(`${name} ${path}: title "${title}"`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) fail(`${name} ${path}: horizontal overflow ${overflow}px`);
    if (errors.length) fail(`${name} ${path}: console errors: ${errors.join(" | ")}`);
    if (SHOTS) {
      fs.mkdirSync(SHOTS, { recursive: true });
      const file = `${SHOTS}/${name}${path.replace(/\//g, "_") || "_home"}.png`;
      await page.screenshot({ path: file, fullPage: true });
    }
    await context.close();
  }
  pass(`${name}: ${pages.length} pages checked`);
}

// 2. Accessibility (axe, WCAG 2.1 A/AA rules).
console.log("Accessibility");
for (const path of pages) {
  const { page, context } = await newPage(viewports.desktop);
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  if (results.violations.length) {
    for (const v of results.violations) {
      fail(`${path}: ${v.id} (${v.impact}) — ${v.help} [${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}]`);
    }
  } else pass(`${path}: no axe violations`);
  await context.close();
}

// 3. Internal links all resolve.
console.log("Internal links");
{
  const { page, context } = await newPage(viewports.desktop);
  const seen = new Set();
  const queue = ["/"];
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    if (!res || res.status() >= 400) {
      fail(`link target ${path} → ${res?.status()}`);
      continue;
    }
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const [p, hash] = href.split("#");
      const target = p || path;
      if (hash) {
        const ok = await page.goto(BASE + target, { waitUntil: "domcontentloaded" }).then(() =>
          page.locator(`[id="${hash}"]`).count(),
        );
        if (!ok) fail(`anchor ${href} (from ${path}) has no target`);
        await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
      }
      if (!seen.has(target)) queue.push(target);
    }
  }
  pass(`${seen.size} internal pages crawled`);
  await context.close();
}

// 4. Keyboard: skip link and visible focus.
console.log("Keyboard");
{
  const { page, context } = await newPage(viewports.desktop);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check(first === "Skip to main content", "first Tab focuses the skip link", `first Tab focused "${first}"`);
  const visible = await page.evaluate(() => {
    const s = getComputedStyle(document.activeElement);
    return s.outlineStyle !== "none" && s.outlineWidth !== "0px";
  });
  check(visible, "focus indicator visible", "no visible focus indicator");
  await page.keyboard.press("Enter");
  const focusedMain = await page.evaluate(() => document.activeElement?.id);
  check(focusedMain === "main-content", "skip link moves focus to main", `skip link focused ${focusedMain}`);
  await context.close();
}

// 5. Mobile menu.
console.log("Mobile menu");
{
  const { page, context } = await newPage(viewports.mobile);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog");
  check((await dialog.isVisible()), "menu opens", "menu did not open");
  await page.keyboard.press("Escape");
  check((await dialog.count()) === 0, "Escape closes menu", "Escape did not close menu");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Patient Information" }).click();
  await page.waitForURL("**/patient-information");
  check((await page.getByRole("dialog").count()) === 0, "menu link navigates and closes menu", "menu stayed open");
  await context.close();
}

// 6. Appointment form.
console.log("Appointment form");
{
  const { page, context } = await newPage(viewports.desktop);
  await page.goto(BASE + "/contact#request-appointment", { waitUntil: "networkidle" });
  const form = page.locator("#request-appointment");
  await form.getByRole("button", { name: "Request an Appointment" }).click();
  const alert = form.getByRole("alert");
  check((await alert.isVisible()), "empty submit shows error summary", "no error summary");
  const focusedAlert = await page.evaluate(() => document.activeElement?.getAttribute("role"));
  check(focusedAlert === "alert", "focus moves to error summary", "focus did not move to error summary");
  const invalid = await form.locator('[aria-invalid="true"]').count();
  check(invalid >= 3, `${invalid} fields marked invalid`, `only ${invalid} fields marked invalid`);

  await form.getByLabel("Patient name").fill("Test Patient");
  await form.getByLabel("Email", { exact: true }).check();
  await form.getByLabel(/Email address/).fill("not-an-email");
  await form.getByLabel(/General reason/).selectOption("exam-cleaning");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Request an Appointment" }).click();
  check((await form.getByText("Please enter a valid email address.").first().isVisible()), "invalid email rejected", "invalid email accepted");

  await form.getByLabel(/Email address/).fill("patient@example.com");
  await form.getByRole("button", { name: "Request an Appointment" }).click();
  const outcome = form.getByRole("status").or(form.getByRole("alert").filter({ hasText: "not sent" }));
  await outcome.first().waitFor({ timeout: 15000 }).catch(() => {});
  const text = (await outcome.first().textContent().catch(() => "")) ?? "";
  if (/demo only/i.test(text)) pass("demo mode reports that nothing was sent");
  else if (/received your request/i.test(text)) pass("live mode shows confirmation");
  else if (/request was not sent/i.test(text)) {
    // Delivery failed: the visitor must be told clearly. Expected only when EXPECT_DELIVERY_FAILURE=1.
    check(process.env.EXPECT_DELIVERY_FAILURE === "1", "failed delivery is reported as not sent", "delivery failed unexpectedly");
  } else fail(`unexpected result: ${text.slice(0, 120)}`);
  await context.close();
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
