import React, { useEffect, useState } from 'react';
import apiService from '../Services/apiService'; // Ensure the path is correct
import './Model.css'; // Ensure the CSS file is correctly imported

const API_URL = '/userSubscriptionPlan';

const Modal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expiredPlans, setExpiredPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get(API_URL);
        const today = new Date();

        const expiredPlans = data.filter(plan => {
          const endDate = new Date(plan.endDate);
          return endDate < today;
        });

        if (expiredPlans.length > 0) {
          setExpiredPlans(expiredPlans);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div className={`modal-content ${isOpen ? 'slide-in' : ''}`}>
        <h2 style={{color:"red"}}>Subscription Alert!</h2>
        <p style={{color:"#721c24"}}>One or more of your subscription plans have expired. Please update your plan.</p>
        <ul>
          {expiredPlans.map(plan => (
            <li key={plan.userSubscriptionId}>
              <strong>User ID:</strong> {plan.userTable.userId} <br />
              <strong>App ID:</strong> {plan.application.appId} <br />
              <strong>End Date:</strong> {new Date(plan.endDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <button style={{background:"rgb(244, 67, 53)"}}className="btn btn-primary" onClick={() => {
          setIsOpen(false);
          onClose();
        }}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
