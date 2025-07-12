document.getElementById("downloadPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById("draftResult").innerText;
  const lines = doc.splitTextToSize(text, 180);
  doc.text(lines, 15, 20);
  doc.save("Draftify_Legal_Document.pdf");
});

document.getElementById("draftForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const resultDiv = document.getElementById("draftResult");
  resultDiv.style.display = 'block';
  resultDiv.innerText = "📝 Sample AI-generated draft: This is a legally compliant placeholder draft generated for preview purposes only.";
  localStorage.setItem("draftHistory", JSON.stringify([resultDiv.innerText]));
  document.getElementById("downloadPDF").style.display = 'inline-block';
});

document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const draft = document.getElementById("draftResult").innerText;
  if (!draft) return alert("No draft available to send.");
  const mailtoLink = `mailto:${email}?subject=Your Draft from Draftify Legal&body=${encodeURIComponent(draft)}`;
  window.location.href = mailtoLink;
});

document.addEventListener("DOMContentLoaded", () => {
  const storedDrafts = JSON.parse(localStorage.getItem("draftHistory") || "[]");
  const historyList = document.getElementById("historyList");
  storedDrafts.forEach((draft, index) => {
    const li = document.createElement("li");
    li.innerText = `Draft ${index + 1}: ${draft.substring(0, 80)}...`;
    historyList.appendChild(li);
  });
});

// Crisp Chat
window.$crisp = [];
window.CRISP_WEBSITE_ID = "ad39ab62-b601-440e-b5e8-4e09b682f2f4";
(function() {
  var d = document;
  var s = d.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = 1;
  d.getElementsByTagName("head")[0].appendChild(s);
})();