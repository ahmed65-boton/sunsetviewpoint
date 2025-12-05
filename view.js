// view.js (EmailJS)

// ✅ Use the EXACT values from your EmailJS dashboard
const PUBLIC_KEY = "nXQldBEXxkP9OvbsA";
const SERVICE_ID = "service_po9ijq4";
const TEMPLATE_ID = "template_tvw22j5";

emailjs.init(PUBLIC_KEY);

const btn = document.getElementById("sendBtn");
const emailInput = document.getElementById("toEmail");
const statusEl = document.getElementById("status");

btn.addEventListener("click", async () => {
  const typedEmail = emailInput.value.trim();

  if (!typedEmail) return (statusEl.textContent = "Enter your email.");
  if (!emailInput.checkValidity()) return (statusEl.textContent = "Enter a valid email.");

  btn.disabled = true;
  btn.textContent = "Sending...";
  statusEl.textContent = "";

  // Must match your EmailJS template variables:
  // To Email: {{email}}, From Name: {{name}}, Subject uses {{title}}, Body uses {{message}}
  const params = {
    email: typedEmail,
    name: "Sunset View Point",
    title: "Welcome!",
    message: "Thanks for visiting! 🌅"
  };

  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
    console.log("EmailJS success:", res);

    statusEl.textContent = "Sent ✅ Check inbox/spam.";
    emailInput.value = "";
  } catch (err) {
    console.error("EmailJS error:", err);
    statusEl.textContent = `Failed ❌ ${err?.text || ""}`.trim();
  } finally {
    btn.disabled = false;
    btn.textContent = "Send me an email";
  }
});
