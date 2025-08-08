import { Link } from "react-router-dom";
import loader from "../../../assets/images/loader.gif";
import { useEffect, useState } from "react";
import parentService from "../../../_services/parent.service";
import toast from "react-hot-toast";

const Subscription = () => {
  const [plans, setPlans] = useState({ trial: [], monthly: [], annually: [] });
  const [loading, setLoading] = useState(false);
  const [selectedMonthlyPlan, setSelectedMonthlyPlan] = useState(null);
  const [selectedAnnualPlan, setSelectedAnnualPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const response = await parentService.getSubscribe();
      setPlans(response.data);
    } catch (error) {
      toast.error("Error fetching subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const CreateSubscription = async (planId) => {
    try {
      const finalTotal = getTotalPrice();

      const payload = {
        plan_id: selectedPlanId,
        subjects: selectedSubjects,
        total_price: finalTotal,
      };
      const response = await parentService.createSubscribe(payload);
      const checkoutUrl = response.data?.checkout_url;
      if (checkoutUrl) {
        toast.success("Subscription created! Redirecting to payment page...");
        window.open(checkoutUrl, "_blank");
      } else {
        console.log("No checkout URL available");
      }
    } catch (error) {
      toast.error("Error creating subscription");
    }
  };

  const getsubject = async (planId) => {
    try {
      const response = await parentService.getPlanSubject({ plan_id: planId });

      // Find addon_price from the selected plan (monthly or annually)
      const addonPrice =
        plans.monthly.find((p) => p.id === planId)?.addon_price ||
        plans.annually.find((p) => p.id === planId)?.addon_price ||
        0;

      // Attach addon_price to each subject
      const subjectsWithPrice = (response.data.subjects || []).map((sub) => ({
        ...sub,
        addon_price: sub.addon_price ?? addonPrice,
      }));

      setSubjects(subjectsWithPrice);
      setSelectedSubjects([]);
      setShowSubjectModal(true);
    } catch (error) {
      toast.error("Error fetching plan subjects");
    }
  };

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const getSelectedPlanPrice = () => {
    const selectedPlan =
      plans.monthly.find((p) => p.id === selectedMonthlyPlan) ||
      plans.annually.find((p) => p.id === selectedAnnualPlan);
    return Number(selectedPlan?.price || 0);
  };

  const getTotalPrice = () => {
    const totalAddonPrice = subjects
      .filter((sub) => selectedSubjects.includes(sub.id))
      .reduce((sum, sub) => sum + Number(sub.addon_price || 0), 0);
    return getSelectedPlanPrice() + totalAddonPrice;
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const trialPlan = plans.trial[0];
  const monthlyPlans = plans.monthly;
  const annualPlans = plans.annually;

  const handleMonthlyGetStarted = () => {
    if (selectedMonthlyPlan) {
      CreateSubscription(selectedMonthlyPlan);
    } else {
      toast.error("Please select a monthly plan");
    }
  };

  const handleAnnualGetStarted = () => {
    if (selectedAnnualPlan) {
      CreateSubscription(selectedAnnualPlan);
    } else {
      toast.error("Please select an annual plan");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-3">
        <img src={loader} width={100} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb mb-24">
        <ul className="flex-align gap-4 mb-0">
          <li>
            <Link
              to="/"
              className="text-gray-200 fw-normal text-15 hover-text-main-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 fw-normal d-flex">
              <i className="ph ph-caret-right"></i>
            </span>
          </li>
          <li>
            <span className="text-main-600 fw-normal text-15">
              Pricing Plan
            </span>
          </li>
        </ul>
      </div>

      <div className="card mt-24">
        <div className="card-header border-bottom">
          <h2 className="mb-0">Pricing Breakdown</h2>
          <p className="text-gray-600 text-15">
            Choose the plan that suits your needs.
          </p>
        </div>

        <div className="card-body">
          <div className="row gy-4 d-flex">
            {/* Trial Plan */}
            {trialPlan && (
              <div className="col-md-4 col-sm-6">
                <div className="plan-item rounded-16 border border-gray-100 p-3 w-100 d-flex flex-column position-relative">
                  <span className="plan-badge py-1 px-16 bg-main-600 text-white position-absolute inset-inline-end-0 inset-block-start-0 mt-8 text-xs">
                    Free Trial
                  </span>
                  <h3 className="mb-4">{trialPlan.name}</h3>
                  <p className="text-gray-600">
                    <strong>Description: </strong>
                    {trialPlan.description}
                  </p>
                  <ul className="list-unstyled text-gray-600 mb-3 free-plan">
                    <li>
                      <strong>Duration:</strong> {trialPlan.duration_days} days
                    </li>
                  </ul>
                  <Link
                    to="#"
                    className="dashboard-button mt-auto"
                    onClick={() => CreateSubscription(trialPlan.id)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            )}

            {/* Monthly Plans */}
            <div className="col-md-4 col-sm-6">
              <div className="plan-item rounded-16 border border-gray-100 p-3 w-100 d-flex flex-column position-relative">
                <span className="plan-badge py-1 px-16 bg-main-600 text-white position-absolute inset-inline-end-0 inset-block-start-0 mt-8 text-xs">
                  Recommended
                </span>
                <h3 className="mb-4">Monthly Plans</h3>
                <p className="text-gray-600">
                  Starting from ${monthlyPlans[0]?.price}/month
                </p>
                <div className="mt-3 flex-grow-1">
                  {monthlyPlans.map((plan) => (
                    <div key={plan.id} className="mb-2 plan-accordion-content">
                      <label className="d-flex align-items-center gap-2 plan-container">
                        <input
                          type="radio"
                          name="monthly-plan"
                          checked={selectedMonthlyPlan === plan.id}
                          onChange={() => {
                            setSelectedMonthlyPlan(plan.id);
                            setSelectedAnnualPlan(null);
                            setSelectedPlanId(plan.id);
                            setSelectedSubjects([]);
                          }}
                        />
                        {plan.name} - ${plan.price}/month
                      </label>
                      {selectedMonthlyPlan === plan.id && (
                        <button
                          className="btn btn-sm btn-outline-primary mt-2"
                          onClick={() => getsubject(plan.id)}
                        >
                          Add Subject
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  to="#"
                  className="dashboard-button mt-auto"
                  onClick={handleMonthlyGetStarted}
                >
                  Get Started{" "}
                  {selectedMonthlyPlan &&
                    selectedSubjects.length > 0 &&
                    ` $${getTotalPrice()}`}
                </Link>
              </div>
            </div>

            {/* Annual Plans */}
            <div className="col-md-4 col-sm-6">
              <div className="plan-item rounded-16 border border-gray-100 p-3 w-100 d-flex flex-column position-relative">
                <span className="plan-badge py-1 px-16 bg-main-600 text-white position-absolute inset-inline-end-0 inset-block-start-0 mt-8 text-xs">
                  Best Value
                </span>
                <h3 className="mb-4">Annual Plans</h3>
                <p className="text-gray-600">
                  Starting from ${annualPlans[0]?.price}/year
                </p>
                <div className="mt-3 flex-grow-1">
                  {annualPlans.map((plan) => (
                    <div key={plan.id} className="mb-2 plan-accordion-content">
                      <label className="d-flex align-items-center gap-2 plan-container">
                        <input
                          type="radio"
                          name="annual-plan"
                          checked={selectedAnnualPlan === plan.id}
                          onChange={() => {
                            setSelectedAnnualPlan(plan.id);
                            setSelectedMonthlyPlan(null);
                            setSelectedPlanId(plan.id);
                            setSelectedSubjects([]);
                          }}
                        />
                        {plan.name} - ${plan.price}/year
                      </label>
                      {selectedAnnualPlan === plan.id && (
                        <button
                          className="btn btn-sm btn-outline-primary mt-2"
                          onClick={() => getsubject(plan.id)}
                        >
                          Add Subject
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <Link
                  to="#"
                  className="dashboard-button mt-auto"
                  onClick={handleAnnualGetStarted}
                >
                  Get Started{" "}
                  {selectedAnnualPlan &&
                    selectedSubjects.length > 0 &&
                    ` $${getTotalPrice()}`}
                </Link>
              </div>
            </div>

            {/* Terms & Policy */}
            <div className="col-12 mt-4">
              <label className="form-label mb-8 h6 mt-32 fontBold">
                <strong>Terms & Policy</strong>
              </label>
              <ul className="list-inside mt-3">
                <li className="text-gray-600 mb-2">
                  1. Set up multiple pricing levels with different features and
                  functionalities to maximize revenue.
                </li>
                <li className="text-gray-600 mb-2">
                  2. Continuously test different price points and discounts to
                  find the sweet spot that resonates with your target audience.
                </li>
                <li className="text-gray-600 mb-2">
                  3. Price your course based on the perceived value it provides
                  to students, considering factors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Modal */}
      {showSubjectModal && (
        <div className="subject-modal-overlay">
          <div className="subject-modal">
            <h4>Select Subjects</h4>
            {subjects.length > 0 ? (
              <div>
                {Object.values(
                  subjects.reduce((groups, sub) => {
                    const levelName = sub.level?.name || "Unknown";
                    if (!groups[levelName]) groups[levelName] = [];
                    groups[levelName].push(sub);
                    return groups;
                  }, {})
                ).map((group, index) => (
                  <div key={index}>
                    <h5>Level {group[0].level?.name}</h5>
                    <ul>
                      {group.map((sub) => (
                        <li key={sub.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={selectedSubjects.includes(sub.id)}
                              onChange={() => handleSubjectSelect(sub.id)}
                            />
                            {sub.name}{" "}
                            {sub.addon_price ? `- $${sub.addon_price}` : ""}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>No subjects found.</p>
            )}

            <p className="mt-3">
              <strong>Total Price:</strong> ${getTotalPrice()}
            </p>

            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowSubjectModal(false)}
            >
              Addon
            </button>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setShowSubjectModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
