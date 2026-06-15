Can you design the CoinHubX Business Dashboard in Figma using the same style and colour scheme as our existing P2P pages?

The dashboard needs to look dark, premium, professional, and Binance-level. Use the same CoinHubX/P2P visual language: deep navy/black background, cyan/electric blue primary accents, purple secondary accents, emerald green for healthy/success states, amber/yellow for warnings, red/rose for critical alerts, glass-style dark cards, rounded corners, subtle glowing borders, clean spacing, and modern exchange-style UI.

This is a visual/UI redesign only. Do not invent any fake stats, fake balances, fake totals, or new financial meanings. Do not change backend logic, fees, commissions, ledger rules, treasury calculations, withdrawal logic, liquidity calculations, or database fields. Every card must map to a real backend field/endpoint. If a value is unavailable, design an “Unavailable” state rather than showing fake zeroes.

Please design these Figma frames:
1. Business Dashboard — Desktop 1440px
2. Business Dashboard — Tablet 768px
3. Business Dashboard — Mobile 390px
4. Treasury breakdown drawer open
5. Withdrawable fee breakdown drawer open
6. Low liquidity warning state
7. Critical liquidity warning state
8. Signup/IP intelligence table expanded row
9. User/IP investigation drawer
10. Map/geographic intelligence section
11. Loading state
12. Data unavailable state
13. Permission denied state

The dashboard sections should be:

1. Top Header
- Page title: Business Dashboard
- Subtitle: Staff-only treasury, finance, liquidity and operational intelligence
- Date range selector: Today / 7D / 10D / 30D / 90D / Custom
- Display currency selector: GBP default, with other supported display currencies
- Quick buttons:
  - Open Treasury
  - Open Liquidity
  - Open Withdrawals
  - Open Analytics
  - Read Dashboard Explanation

2. Treasury / Finance
This should be the main top section and easiest to understand.
Cards:
- Withdrawable fee profit
- Platform treasury position
- Native GBP cash only
- Treasury crypto value
- Fee percentage assurance

Each finance card must clearly show:
- large main value
- small explanation text
- native balance label where needed
- display equivalent label where needed
- source badge such as “Ledger-backed” or “Live endpoint”
- View breakdown button

Make it very clear that treasury is platform-owned treasury only, not customer balances. Make it clear that withdrawable fee profit is platform fee profit, not customer money.

3. Liquidity Warning / Top-Up
This section needs to be very obvious.
Show:
- Liquidity status: Healthy / Low / Critical
- Available USDT
- Minimum threshold
- Missing to threshold
- Suggested top-up
- Button: Open Liquidity Top-Up

Healthy should look green. Low should look amber/yellow. Critical should look red. Staff should instantly know if liquidity needs topping up.

4. Operations / Growth
Separate this from finance so staff do not confuse user activity with balances.
Cards:
- Active users
- Total users
- New signups
- Signup IPs
- Suspicious signup IPs
- Referral rewards paid

5. Signup / IP Intelligence
Design this like a security/risk table.
Rows should show:
- user email/name
- signup time
- IP address
- country/city
- device
- browser
- OS
- referral code
- risk score
- risk flags
- failed logins from same IP

Include row/action buttons:
- View User
- Copy IP
- Search Same IP
- View Security Events

6. Rails / Ledger / Liquidity Assurance
Design this as an operational safety panel.
Cards:
- Total assets in registry
- Withdraw-enabled assets
- Wired rail chains
- Ledger compliance
- Liquidity reconciliation
- Commission / fee flow status

Use green/amber/red status styling so staff can instantly see what is healthy, warning, or broken.

7. Geographic Map / User Location
Design a map panel showing where users come from.
Include:
- shaded country map
- top country share
- top region share
- region percentage bars
- hover tooltip style
- examples like Europe 32%, UK 18%, Africa 10%

8. KPI Truth Audit
This can be collapsed or styled as an internal staff table.
Columns:
- UI Card
- Endpoint
- Field used
- Meaning
- Native or display equivalent
- Staff interpretation

This section is important because it proves the dashboard is using real data and not fake numbers.

Buttons/actions needed:
- View breakdown
- Open Liquidity Top-Up
- Open Withdrawals
- Open Treasury
- Open Analytics
- Open User
- Copy IP
- Search Same IP
- View Security Events
- Read Dashboard Explanation

Button style:
- Primary buttons should use the same cyan/electric-blue P2P gradient style.
- Secondary buttons should be dark glass buttons with cyan borders.
- Warning buttons should be amber.
- Critical/danger buttons should be red.
- Success states should be emerald green.

Use this visual direction:
- Background: #020618, #071327, #0A1929, #051018
- Primary accent: #00F0FF, #0CEBFF, #00B8E6, #0A84FF
- Secondary accent: #A855F7, #8B5CF6
- Success: #22C55E, #16A34A
- Warning: #F59E0B, #D97706
- Critical: #EF4444, #F6465D

Important rules:
- Do not invent new totals.
- Do not invent fake balances.
- Do not change fees or commissions.
- Do not hide native asset backing.
- Do not make display currency look like literal cash.
- Do not combine customer balances with treasury balances.
- Do not make finance and operations cards look the same.
- Do not remove loading/error/unavailable states.
- Do not remove the dashboard explanation link.
- Anything that needs backend changes should be clearly marked as “future backend requirement”.

The final design should make it instantly clear to staff:
- what treasury means
- what fee profit means
- what liquidity means
- what user activity means
- what signup/IP risk means
- what is native balance vs display equivalent
- what is real ledger-backed data vs unavailable data

The goal is a serious, professional, Binance-level internal business dashboard that matches the CoinHubX P2P style but keeps all backend data and financial logic untouched.