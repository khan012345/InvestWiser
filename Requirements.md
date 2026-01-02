Business Requirements Document (BRD)
SIP/SWP Calculator Application - UPDATED

1. PROJECT OVERVIEW
Application Name: SIP/SWP Calculator (Multi-Region)
Purpose: To provide Indian and US users with accurate calculations for Systematic Investment Plans (SIP), Systematic Withdrawal Plans (SWP), and Step-Up SIPs with region-appropriate currency formatting, interactive charts, and year-on-year visualizations.
Target Users:

Indian investors (domestic)
Indian diaspora in the United States
US-based investors interested in SIP methodology


2. FUNCTIONAL REQUIREMENTS
2.1 Calculator Types
The application must support three calculation modes:
2.1.1 Regular SIP Calculator

Input Parameters:

Monthly investment amount
Expected annual return rate (%)
Investment tenure (years)
Region selection (India/US)


Output:

Total investment amount
Expected returns
Maturity value
Interactive charts
Year-on-year breakdown (table)



2.1.2 Step-Up SIP Calculator

Input Parameters:

Initial monthly investment amount
Annual step-up percentage (%)
Step-up frequency (Annual/Semi-Annual/Quarterly)
Expected annual return rate (%)
Investment tenure (years)
Region selection (India/US)


Output:

Total investment amount
Expected returns
Maturity value
Interactive charts showing growth trajectory
Year-on-year breakdown showing:

Year number
Monthly SIP amount for that year
Annual investment
Expected value at year-end
Cumulative investment
Cumulative returns





2.1.3 SWP Calculator

Input Parameters:

Initial investment corpus
Monthly withdrawal amount
Expected annual return rate (%)
Withdrawal tenure (years)
Region selection (India/US)


Output:

Total withdrawn amount
Remaining corpus
Interactive charts
Year-on-year breakdown showing:

Year number
Annual withdrawal
Corpus at year-end
Interest earned






3. DEFAULT VALUES
3.1 Default Input Values
When the application loads or resets, use these default values:

Monthly Investment Amount:

INR: ₹25,000
USD: $300 (approximate equivalent)


Interest Rate: 10% per annum
Time Period: 10 years
Region: INR (Indian Rupees)
Step-Up Percentage: 7% per annum
Step-Up Frequency: Annual (default)

3.2 Suggested Ranges
Display helpful ranges near inputs:

Interest Rate: Common range 8-15% for equity, 6-9% for debt
Step-Up: Typical range 5-10%
Tenure: Minimum 1 year, Maximum 50 years


4. STEP-UP FREQUENCY OPTIONS
4.1 Frequency Types
Users can select how often their SIP amount increases:

Annual (Default): Step-up applied once per year
Semi-Annual: Step-up applied twice per year (every 6 months)
Quarterly: Step-up applied four times per year (every 3 months)

4.2 Calculation Logic
Annual Step-Up

Increase amount once per year on anniversary
Example: Start ₹10,000/month, 10% step-up

Year 1: ₹10,000/month
Year 2: ₹11,000/month
Year 3: ₹12,100/month



Semi-Annual Step-Up

Increase amount every 6 months
Step-up amount = (Annual step-up %) / 2
Example: Start ₹10,000/month, 10% annual step-up (5% semi-annual)

Months 1-6: ₹10,000/month
Months 7-12: ₹10,500/month
Months 13-18: ₹11,025/month
Months 19-24: ₹11,576/month



Quarterly Step-Up

Increase amount every 3 months
Step-up amount = (Annual step-up %) / 4
Example: Start ₹10,000/month, 10% annual step-up (2.5% quarterly)

Months 1-3: ₹10,000/month
Months 4-6: ₹10,250/month
Months 7-9: ₹10,506/month
Months 10-12: ₹10,769/month



4.3 UI for Frequency Selection

Radio buttons or dropdown for frequency selection
Only visible when Step-Up SIP calculator is active
Clear labels: "Annual", "Semi-Annual (every 6 months)", "Quarterly (every 3 months)"


5. LOCALIZATION & FORMATTING REQUIREMENTS
5.1 Region Toggle

Prominent toggle/selector for India vs US region
Default region: INR (Indian Rupees)

5.2 Currency Formatting
5.2.1 US Format

Currency symbol: $ (USD)
Thousand separator: Comma (,)
Decimal places: 2
Examples:

$1,000.00
$10,000.50
$100,000.25
$1,000,000.00 (One Million)



5.2.2 Indian Format

Currency symbol: ₹ (INR)
Number system: Indian numbering (Lakhs and Crores)
Decimal places: 2
Formatting rules:

Up to 99,999: ₹99,999.00
1 Lakh to 99 Lakhs: ₹10,00,000.00 (with commas at Indian positions)
1 Crore and above: Display in "Cr" notation



Indian Format Examples:

₹10,000.00
₹1,00,000.00 (1 Lakh)
₹10,00,000.00 (10 Lakhs)
₹99,00,000.50 (99 Lakhs)
₹1,00,00,000.00 → Display as "₹1.00 Cr"
₹2,50,00,000.00 → Display as "₹2.50 Cr"
₹250,00,00,000.00 → Display as "₹250.00 Cr"

Rounding Rules:

All calculations: Round to 2 decimal places
Display values: Show 2 decimal places
For Crore notation: Show decimals (e.g., ₹2.75 Cr), but if whole number, can show as ₹2.00 Cr or ₹2 Cr (developer choice for cleaner UI)


6. INTERACTIVE CHARTS & VISUALIZATIONS
6.1 Chart Requirements
Purpose: Provide clear visual representation of investment growth, showing the impact of different parameters (interest rate, time, amount, step-up frequency).
6.2 Chart Types to Implement
6.2.1 Primary Chart: Growth Over Time (Area/Line Chart)

X-axis: Years (0 to investment tenure)
Y-axis: Amount (in appropriate currency format)
Two data series:

Total Investment (Stacked area - darker shade)
Total Value (Stacked area - lighter shade on top)


This clearly shows the "wealth creation gap" between what you invested vs what you earned

6.2.2 Secondary Chart: Investment vs Returns (Pie/Donut Chart)

Two segments:

Total Principal Invested
Total Returns Earned


Show percentages and absolute values
Color-coded for easy distinction

6.2.3 Interactive Features

Hover tooltips: Show exact values at any point
Year markers: Click on year to see detailed breakdown
Responsive: Adapts to mobile/tablet/desktop screens
Legend: Clear legend explaining what each color represents

6.3 Dynamic Chart Updates
Charts must update in real-time when user changes:

Interest Rate: Show how returns curve changes
Time Period: Extend or contract the timeline
Investment Amount: Scale the values proportionally
Step-Up Frequency: Show different growth trajectories

Annual: Stepped growth pattern
Semi-annual: More frequent smaller steps
Quarterly: Smoother growth curve



6.4 Comparison Visualization (Enhancement)
Optional feature to show multiple scenarios on same chart:

Base scenario (current inputs)
+2% interest rate
-2% interest rate
Different step-up frequencies side-by-side


7. YEAR-ON-YEAR VISUALIZATION
7.1 Table Format Requirements
Purpose: Allow users to understand their investment/withdrawal journey at each year milestone, especially important for Step-Up SIP where monthly contributions change.
7.2 Regular SIP Table Columns:

Year
Annual Investment
Cumulative Investment
Expected Value at Year-End
Total Returns to Date

7.3 Step-Up SIP Table Columns:

Year
Monthly SIP Amount (increases based on frequency)
Annual Investment (sum of all monthly SIPs that year)
Cumulative Investment
Expected Value at Year-End
Total Returns to Date

Key User Story: "If I start with ₹25,000/month with 7% annual step-up, I want to see that in Year 10, I'll be paying ₹49,178/month, so I can plan my finances accordingly."
7.4 SWP Table Columns:

Year
Annual Withdrawal
Cumulative Withdrawal
Corpus at Year-End
Interest Earned (Year)

7.5 Table Features:

All values rounded to 2 decimal places
Alternating row colors for readability
Sticky header when scrolling
Highlight every 5th year
Summary row at bottom
Mobile-responsive (horizontal scroll if needed)


8. USER INTERFACE REQUIREMENTS
8.1 Layout

Clean, modern interface with tabs for calculator types
Region toggle prominently displayed at top right
Left panel: Input form with sliders and number inputs
Right panel:

Summary cards (top)
Charts (middle)
Year-on-year table (bottom)



8.2 Input Controls

Sliders with input boxes for easy adjustment
Real-time calculation updates (debounced for performance)
Input validation with helpful error messages
"Reset to Default" button

8.3 Visual Design

Summary cards showing:

Total Investment (principal color)
Expected Returns (success/green color)
Maturity Value (highlight color)


Color scheme distinguishing investment vs returns
Smooth animations when values update
Loading states for calculations

8.4 Responsive Design

Mobile: Stacked layout (inputs top, results bottom)
Tablet: Side-by-side with adequate spacing
Desktop: Full width utilization with charts


9. CALCULATION FORMULAS
9.1 Regular SIP Formula
FV = P × ((1 + r)^n - 1) / r × (1 + r)
Where:

P = Monthly investment
r = Monthly rate of return (annual rate / 12 / 100)
n = Total number of months

9.2 Step-Up SIP Formula
Calculate month-by-month with step-ups applied at appropriate intervals:
For Annual Step-Up:

Increase P by step-up % every 12 months

For Semi-Annual Step-Up:

Increase P by (step-up % / 2) every 6 months

For Quarterly Step-Up:

Increase P by (step-up % / 4) every 3 months

Compound formula:
For each period:
  FV = Previous_FV × (1 + r) + Current_P × ((1 + r)^months_in_period - 1) / r × (1 + r)
9.3 SWP Formula
Calculate month by month:
For each month:
  New_Corpus = (Previous_Corpus × (1 + monthly_rate)) - Monthly_Withdrawal
Where:

Monthly rate = Annual rate / 12 / 100

9.4 Rounding

All intermediate calculations: Use full precision
Final display values: Round to 2 decimal places
Use banker's rounding (round half to even) for accuracy


10. TECHNICAL SPECIFICATIONS
10.1 Technology Stack

Framework: React with hooks for state management
Styling: Tailwind CSS for responsive design
Charts: Recharts (lightweight and React-friendly)
Icons: Lucide React
Number Formatting: Custom utility functions for INR/USD

10.2 Performance Requirements

Calculations complete within 100ms
Smooth chart animations (60fps)
Debounced input updates (300ms delay)
Lazy loading for tables with 20+ years

10.3 Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)
Mobile browsers (iOS Safari, Chrome Android)


11. EXAMPLE SCENARIOS
Example 1: Default Scenario (Indian User)
Inputs:

Monthly SIP: ₹25,000
Interest rate: 10% p.a.
Tenure: 10 years
Step-up: 7% annually

Expected Output:

Total Investment: ₹41.83 Lakhs
Expected Returns: ₹28.62 Lakhs
Maturity Value: ₹70.45 Lakhs
Year 10 Monthly SIP: ₹49,178.78

Example 2: Quarterly Step-Up Comparison
Show how quarterly vs annual affects growth:

Same inputs as Example 1
Annual step-up: ₹70.45 Lakhs final value
Quarterly step-up (1.75% per quarter): Slightly higher final value due to more frequent compounding

Example 3: Interest Rate Sensitivity
Charts should clearly show:

At 8%: Lower maturity value
At 10%: Default scenario
At 12%: Higher maturity value
Visual gap between lines grows with time


12. SUCCESS CRITERIA
✅ Accurate calculations matching financial formulas
✅ Correct currency formatting (INR lakhs/crores, USD standard)
✅ All values rounded to 2 decimal places
✅ Interactive charts updating in real-time
✅ Clear visual distinction between investment and returns
✅ Step-up frequency options (annual, semi-annual, quarterly) working correctly
✅ Year-on-year table helping users plan future contributions
✅ Default values pre-populated (₹25,000, 10%, 10 years, 7% step-up)
✅ Mobile-responsive design
✅ Intuitive UI requiring minimal learning

13. PRIORITY FEATURES
Must Have (MVP):

All three calculator types (SIP, Step-Up SIP, SWP)
Default values pre-populated
INR/USD formatting
Annual step-up frequency
Area chart showing investment vs returns
Year-on-year table
2 decimal place rounding

Should Have (V1.1):

Semi-annual and quarterly step-up frequency
Pie chart for investment vs returns breakdown
Interactive chart tooltips
Reset button

Nice to Have (Future):

Comparison scenarios
Export to PDF/Excel
Save calculations
Share results via link