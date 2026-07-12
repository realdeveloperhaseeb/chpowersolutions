// Client-side Web3Forms sender. Web3Forms' free tier only accepts submissions
// from the browser (server-side needs their Pro plan), so notifications are fired
// from the client. The access key is public by design (it can only deliver to the
// fixed inbox it was created for), so it's safe to expose.
export async function sendWeb3Forms({ key, subject, message, fromName, replyTo }) {
  if (!key) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: fromName || "CH Power Solutions",
        replyto: replyTo || undefined,
        message,
      }),
    });
    const data = await res.json().catch(() => ({}));
    return Boolean(data.success);
  } catch {
    return false;
  }
}
