import React from 'react'

const Footer = () => {
    return (
        <div className="dashboard-footer">
            <div className="flex-between flex-wrap gap-16">
                <p className="text-gray-300 text-13 fw-normal"> &copy; Copyright LMS 2025, All Right Reserverd</p>
                <div className="flex-align flex-wrap gap-16">
                    <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">License</a>
                    <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Documentation</a>
                    <a href="#" className="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Support</a>
                </div>
            </div>
        </div>
    )
}

export default Footer