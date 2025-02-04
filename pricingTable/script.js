// Select elements
const pricingToggle = document.getElementById("pricing-toggle");
const plans = document.querySelectorAll(".plan");
const toggleLabel = document.getElementById("toggle-label");

// Toggle pricing between monthly and yearly
pricingToggle.addEventListener("change", () => {
  const isYearly = pricingToggle.checked;

  plans.forEach(plan => {
    const priceValue = plan.querySelector(".price-value");
    const billingCycle = plan.querySelector(".billing-cycle");

    if (isYearly) {
      // Update to yearly pricing
      priceValue.textContent = plan.dataset.yearly;
      billingCycle.textContent = "/year";
      toggleLabel.textContent = "Yearly";
    } else {
      // Update to monthly pricing
      priceValue.textContent = plan.dataset.monthly;
      billingCycle.textContent = "/month";
      toggleLabel.textContent = "Monthly";
    }
  });
});
