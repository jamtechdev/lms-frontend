import { Link } from "react-router-dom";
import loader from "../../../assets/images/loader.gif";
import { useEffect, useState } from "react";
import parentService from "../../../_services/parent.service";

const Subscription = () => {
  const [plans, setPlans] = useState({ trial: [], monthly: [], annually: [] });
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const response = await parentService.getSubscribe();
      setPlans(response.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-3">
        <img src={loader} width={100} alt="Loading..." />
      </div>
    );
  }

  const trialPlan = plans.trial[0];
  const monthlyPlans = plans.monthly;
  const annualPlans = plans.annually;

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

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
          <div className="row gy-4 d-flex align-items-stretch">
            {trialPlan && (
              <div className="col-md-4 col-sm-6 d-flex">
                <div className="plan-item rounded-16 border border-gray-100 p-3 h-100 w-100 d-flex flex-column">
                  <h3 className="mb-4">{trialPlan.name}</h3>
                  <p className="text-gray-600 flex-grow-1">
                    {trialPlan.description}
                  </p>
                  <h2 className="h1 fw-medium text-main mb-32 mt-16">Free</h2>
                  <Link to="#" className="dashboard-button mt-auto">
                    Get Started
                  </Link>
                </div>
              </div>
            )}

            <div className="col-md-4 col-sm-6 d-flex">
              <div className="plan-item rounded-16 border border-gray-100 p-3 h-100 w-100 d-flex flex-column">
                <h3 className="mb-4">Monthly Plans</h3>
                <p className="text-gray-600">
                  Starting from ${monthlyPlans[0]?.price}/month
                </p>
                <div className="mt-3 flex-grow-1">
                  {monthlyPlans.map((plan) => (
                    <div key={plan.id} className="mb-2">
                      <label className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPlan === plan.id}
                          onChange={() => handlePlanSelect(plan.id)}
                        />
                        {plan.name} - ${plan.price}/month
                      </label>
                    </div>
                  ))}
                </div>
                <Link to="#" className="dashboard-button mt-auto">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 d-flex">
              <div className="plan-item rounded-16 border border-gray-100 p-3 h-100 w-100 d-flex flex-column">
                <h3 className="mb-4">Annual Plans</h3>
                <p className="text-gray-600">
                  Starting from ${annualPlans[0]?.price}/year
                </p>
                <div className="mt-3 flex-grow-1">
                  {annualPlans.map((plan) => (
                    <div key={plan.id} className="mb-2">
                      <label className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedPlan === plan.id}
                          onChange={() => handlePlanSelect(plan.id)}
                        />
                        {plan.name} - ${plan.price}/year
                      </label>
                    </div>
                  ))}
                </div>
                <Link to="#" className="dashboard-button mt-auto">
                  Get Started
                </Link>
              </div>
            </div>

            <div className="col-12 mt-4">
              <label className="form-label mb-8 h6 mt-32 fontBold">
                Terms & Policy
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
    </div>
  );
};

export default Subscription;
