const BRAND = {
  bronze: '#B37839',
  bronzeLight: '#C9A87F',
  bronzeDark: '#8F5F2E',
  ink: '#11100E',
  paper: '#FFFDF8',
  ivory: '#F8F4ED',
  stone: '#6B6560',
  font: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

/* ── Shared wrapper ── */
const shell = (content) => `
  <table cellpadding="0" cellspacing="0" style="width:100%;background:${BRAND.ivory};font-family:${BRAND.font}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${BRAND.paper};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(17,16,14,0.06)">
          <tr>
            <td style="padding:0">
              <!-- Gold header stripe -->
              <table cellpadding="0" cellspacing="0" style="width:100%;height:4px;background:linear-gradient(90deg,${BRAND.bronze},${BRAND.bronzeLight},${BRAND.bronze})">
                <tr><td style="height:4px;font-size:0;line-height:0">&nbsp;</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 0">
              <!-- Brand mark -->
              <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr>
                  <td style="font-size:22px;font-weight:700;letter-spacing:2px;color:${BRAND.ink}">
                    RUDHRAM
                  </td>
                  <td align="right" style="font-size:10px;font-weight:600;letter-spacing:1.5px;color:${BRAND.stone};text-transform:uppercase">
                    Enterprises
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 0;font-size:14px;line-height:1.7;color:${BRAND.stone}">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px 40px">
              <table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid ${BRAND.ivory}">
                <tr>
                  <td style="padding-top:20px;font-size:11px;line-height:1.7;color:${BRAND.stone}">
                    Rudhram Enterprises<br>
                    <span style="color:#999">This is an automated message. Please do not reply directly to this email.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!-- Footer spacer -->
        <table cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
          <tr>
            <td align="center" style="padding:16px 0;font-size:11px;color:#999;font-family:${BRAND.font}">
              Rudhram Group &middot; Venture Building &middot; Design &middot; Innovation
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

/* ── Label-value row for the team notification table ── */
const fieldRow = (label, value, alt) => `
  <tr${alt ? ` style="background:${BRAND.ivory}"` : ''}>
    <td style="padding:10px 16px;font-size:12px;font-weight:600;color:${BRAND.stone};text-transform:uppercase;letter-spacing:0.5px;width:100px;vertical-align:top">${label}</td>
    <td style="padding:10px 16px;font-size:14px;color:${BRAND.ink};line-height:1.5">${value}</td>
  </tr>
`;

/* ════════════════════════════════════════
   TEAM NOTIFICATION — new inquiry arrives
   ════════════════════════════════════════ */
const teamNotificationHtml = ({ name, email, interest, message, submittedAt }) => shell(`
  <h2 style="font-size:18px;font-weight:700;color:${BRAND.ink};margin:0 0 4px">New inquiry received</h2>
  <p style="margin:0 0 24px;font-size:13px;color:${BRAND.stone}">${interest} &middot; ${submittedAt}</p>

  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid ${BRAND.ivory}">
    ${fieldRow('Name', name, false)}
    ${fieldRow('Email', `<a href="mailto:${email}" style="color:${BRAND.bronze};text-decoration:none;font-weight:600">${email}</a>`, true)}
    ${fieldRow('Interest', `<span style="display:inline-block;padding:2px 10px;border-radius:4px;font-size:12px;font-weight:600;color:${BRAND.bronzeDark};background:${BRAND.ivory}">${interest}</span>`, false)}
    ${fieldRow('Submitted', submittedAt, true)}
  </table>

  <div style="margin:20px 0 0;padding:16px 20px;background:${BRAND.ivory};border-radius:8px;border-left:3px solid ${BRAND.bronze}">
    <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${BRAND.stone}">Message</p>
    <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND.ink};white-space:pre-wrap">${message}</p>
  </div>
`);

/* ════════════════════════════════════════
   AUTO-REPLY to the user
   ════════════════════════════════════════ */
const autoReplyHtml = (name) => shell(`
  <h2 style="font-size:20px;font-weight:700;color:${BRAND.ink};margin:0 0 4px">Thank you for reaching out</h2>
  <p style="margin:0 0 24px;font-size:14px;color:${BRAND.stone}">We&rsquo;ve received your inquiry</p>

  <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:${BRAND.ink}">
    Dear ${name},
  </p>

  <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:${BRAND.ink}">
    Thank you for contacting <strong>Rudhram Enterprises</strong>. We have received your inquiry and will review it personally.
  </p>

  <table cellpadding="0" cellspacing="0" style="width:100%;margin:24px 0;background:${BRAND.ivory};border-radius:8px">
    <tr>
      <td style="padding:20px 24px;text-align:center;font-size:15px;line-height:1.7;color:${BRAND.stone}">
        <strong style="color:${BRAND.bronze}">Expected response time:</strong><br>
        Within 48 hours
      </td>
    </tr>
  </table>

  <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:${BRAND.ink}">
    If your matter is urgent, please reach out directly at
    <a href="mailto:hello@rudhramenterprises.com" style="color:${BRAND.bronze};text-decoration:none;font-weight:600">hello@rudhramenterprises.com</a>.
  </p>

  <p style="margin:0 0 8px;font-size:15px;line-height:1.8;color:${BRAND.ink}">
    Warm regards,
  </p>
  <p style="margin:0;font-size:15px;line-height:1.5;color:${BRAND.ink}">
    <strong style="color:${BRAND.bronze}">The Rudhram Team</strong>
  </p>
`);

module.exports = { teamNotificationHtml, autoReplyHtml };
