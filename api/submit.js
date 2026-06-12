export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    firstName,
    email,
    protein,
    calories,
    tdee,
    goal,
    days,
    experience,
    gym,
    calLabel,
    calNote,
    nutritionPerMeal,
    rpeRange,
    rpePlain,
  } = req.body;

  // Map raw values to readable labels
  const goalLabels = {
    cut: 'Fat Loss',
    recomp: 'Body Recomp',
    maintain: 'Maintain + Recomp',
    build: 'Muscle Build',
  };
  const gymLabels = {
    full: 'Full Gym',
    condo: 'Condo / Hotel Gym',
    home: 'Home Setup',
  };
  const experienceLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  const goalLabel = goalLabels[goal] || goal;
  const gymLabel = gymLabels[gym] || gym;
  const experienceLabel = experienceLabels[experience] || experience;

  // Build the HTML email
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your YaoMoves Framework</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1A1612;padding:24px 32px;border-radius:4px 4px 0 0;">
              <p style="margin:0;font-size:20px;font-weight:900;color:#F5F0E8;letter-spacing:-0.02em;">
                Yao<span style="color:#E8845A;">Moves</span>
              </p>
              <p style="margin:6px 0 0;font-size:11px;color:#8A7F78;letter-spacing:0.12em;text-transform:uppercase;">
                i'm playing the long game.
              </p>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="background:#1A1612;padding:40px 32px 48px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#E8845A;">
                your body recomp framework
              </p>
              <h1 style="margin:0 0 12px;font-size:32px;font-weight:900;color:#FDFAF5;line-height:1.1;letter-spacing:-0.02em;">
                Here's your <em style="color:#E8845A;font-style:italic;">starting point,</em><br>${firstName}.
              </h1>
              <p style="margin:0;font-size:14px;color:#B0A89E;line-height:1.6;">
                Everything below is calculated from your numbers. Save this email — come back to it when you need a reset.
              </p>
            </td>
          </tr>

          <!-- STAT CARDS -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="31%" style="background:#fff;border:2px solid #EDE5D8;border-top:3px solid #C4622D;border-radius:3px;padding:18px 14px;vertical-align:top;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#8A7F78;">Daily Protein</p>
                    <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:#1A1612;line-height:1;">${protein}</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">grams / day</p>
                  </td>
                  <td width="4%"></td>
                  <td width="31%" style="background:#fff;border:2px solid #EDE5D8;border-top:3px solid #3D6B5A;border-radius:3px;padding:18px 14px;vertical-align:top;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#8A7F78;">Calorie Target</p>
                    <p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#1A1612;line-height:1;">~${calories.toLocaleString()}</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">kcal / day</p>
                  </td>
                  <td width="4%"></td>
                  <td width="31%" style="background:#fff;border:2px solid #EDE5D8;border-top:3px solid #8B7355;border-radius:3px;padding:18px 14px;vertical-align:top;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#8A7F78;">Weekly Sessions</p>
                    <p style="margin:0 0 4px;font-size:28px;font-weight:700;color:#1A1612;line-height:1;">${days}</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">days / week</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NUTRITION -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#1A1612;border-bottom:2px solid #EDE5D8;padding-bottom:10px;">
                Your Nutrition Starting Point
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;border-radius:3px;padding:0;margin-top:16px;">
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #EDE5D8;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#3D3530;">Daily protein target</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;font-family:monospace;">${protein}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #EDE5D8;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#3D3530;">Protein per meal (3 meals)</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;font-family:monospace;">${nutritionPerMeal}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #EDE5D8;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#3D3530;">Estimated maintenance calories (TDEE)</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;font-family:monospace;">~${tdee.toLocaleString()} kcal</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:13px;color:#3D3530;">Recomp calorie target</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;font-family:monospace;">${calLabel}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font-size:12px;color:#8A7F78;line-height:1.6;font-style:italic;">${calNote}</p>
            </td>
          </tr>

          <!-- INTENSITY -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#1A1612;border-bottom:2px solid #EDE5D8;padding-bottom:10px;">
                Your Intensity Target
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;border-radius:3px;">
                <tr>
                  <td style="padding:20px;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#C4622D;">How hard should each set feel?</p>
                    <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#C4622D;">${rpeRange}</p>
                    <p style="margin:0;font-size:13px;color:#3D3530;line-height:1.6;">${rpePlain}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4-WEEK BLOCK -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#1A1612;border-bottom:2px solid #EDE5D8;padding-bottom:10px;">
                Your 4-Week Progressive Plan
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="23%" style="background:#F5F0E8;border:2px solid #EDE5D8;border-radius:3px;padding:14px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8A7F78;">Week 1</p>
                    <p style="margin:0 0 2px;font-size:10px;font-weight:600;color:#A04E22;text-transform:uppercase;">Learn</p>
                    <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1A1612;">2 / 3</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">compound / accessory sets</p>
                  </td>
                  <td width="2%"></td>
                  <td width="23%" style="background:#F5F0E8;border:2px solid #EDE5D8;border-radius:3px;padding:14px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8A7F78;">Week 2</p>
                    <p style="margin:0 0 2px;font-size:10px;font-weight:600;color:#A04E22;text-transform:uppercase;">Build</p>
                    <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1A1612;">3 / 4</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">compound / accessory sets</p>
                  </td>
                  <td width="2%"></td>
                  <td width="23%" style="background:#F5F0E8;border:2px solid #EDE5D8;border-radius:3px;padding:14px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8A7F78;">Week 3</p>
                    <p style="margin:0 0 2px;font-size:10px;font-weight:600;color:#A04E22;text-transform:uppercase;">Peak</p>
                    <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1A1612;">4 / 5</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">compound / accessory sets</p>
                  </td>
                  <td width="2%"></td>
                  <td width="23%" style="background:#F5F0E8;border:2px solid #3D6B5A;border-radius:3px;padding:14px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#8A7F78;">Week 4</p>
                    <p style="margin:0 0 2px;font-size:10px;font-weight:600;color:#3D6B5A;text-transform:uppercase;">Deload</p>
                    <p style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1A1612;">2 / 3</p>
                    <p style="margin:0;font-size:11px;color:#8A7F78;">compound / accessory sets</p>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;font-size:12px;color:#8A7F78;line-height:1.6;font-style:italic;">Rest 90–120 seconds between sets. Same movements every week — only the volume changes.</p>
            </td>
          </tr>

          <!-- YOUR PROFILE -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#1A1612;border-bottom:2px solid #EDE5D8;padding-bottom:10px;">
                Your Profile
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;border-radius:3px;">
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #EDE5D8;">
                    <table width="100%"><tr>
                      <td style="font-size:13px;color:#3D3530;">Goal</td>
                      <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;">${goalLabel}</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;border-bottom:1px solid #EDE5D8;">
                    <table width="100%"><tr>
                      <td style="font-size:13px;color:#3D3530;">Experience level</td>
                      <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;">${experienceLabel}</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;">
                    <table width="100%"><tr>
                      <td style="font-size:13px;color:#3D3530;">Gym access</td>
                      <td align="right" style="font-size:13px;font-weight:600;color:#1A1612;">${gymLabel}</td>
                    </tr></table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EXPECTATIONS -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#3D6B5A;border-radius:3px;padding:0;">
                <tr>
                  <td style="padding:28px;">
                    <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#D4E8E0;">What to actually expect in 12 weeks</p>
                    <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">💪 Your strength numbers will go up. That's the signal that it's working — not the scale.</p>
                    <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">👖 Clothes will start fitting differently before you see scale changes.</p>
                    <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">📉 The scale may stay flat or fluctuate ±3 lbs. This is normal and doesn't mean it's not working.</p>
                    <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">⚡ Energy and sleep quality often improve within weeks 2–4 when protein and training are consistent.</p>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);line-height:1.6;">📸 Take progress photos at week 1 and week 6. The mirror tells you more than the scale.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#FDFAF5;padding:32px 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE5D8;border:2px solid #E8845A;border-radius:3px;">
                <tr>
                  <td style="padding:32px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C4622D;">what's next</p>
                    <p style="margin:0 0 12px;font-size:22px;font-weight:700;color:#1A1612;letter-spacing:-0.02em;">Ready for the full program?</p>
                    <p style="margin:0 0 24px;font-size:13px;color:#3D3530;line-height:1.65;max-width:380px;margin-left:auto;margin-right:auto;">This framework is your foundation. The full YaoMoves program gives you the progressive week-by-week plan, exercise videos, and the exact structure that makes consistency actually happen.</p>
                    <a href="https://yaomoves.com" style="display:inline-block;background:#C4622D;color:#FDFAF5;padding:14px 32px;border-radius:3px;font-weight:600;font-size:14px;text-decoration:none;letter-spacing:0.04em;">Join the Waitlist</a>
                    <p style="margin:12px 0 0;font-size:11px;color:#8A7F78;">no pressure. your framework works on its own.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1A1612;padding:24px 32px;border-radius:0 0 4px 4px;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;color:#8A7F78;">
                <strong style="color:#E8845A;">YaoMoves</strong> · Strength training for working moms · Toronto, ON
              </p>
              <p style="margin:0;font-size:11px;color:#5A524C;">
                You're receiving this because you generated a framework at yaomoves.com.<br>
                No spam, ever.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Send via Resend
  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'YaoMoves Results <results@contact.yaomoves.com>',
        to: [email],
        reply_to: 'kchow.karen@gmail.com',
        subject: `${firstName}, here's your body recomp framework`,
        html: html,
      }),
    });

    if (!resendRes.ok) {
      const error = await resendRes.json();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
