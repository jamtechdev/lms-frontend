import studentImg from "../../../assets/images/student-img1.png";
const AssessmentHistory = () => {

    return (
        <>
        <div class="dashboard-body">

            <div class="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">

                <div class="breadcrumb mb-24 ps-0">
                    <ul class="flex-align gap-4">
                        <li><a href="index.html" class="text-gray-200 fw-normal text-15 hover-text-main-600">Home</a></li>
                        <li> <span class="text-gray-500 fw-normal d-flex"><i class="ph ph-caret-right"></i></span> </li>
                        <li><span class="text-main-600 fw-normal text-15">Assignments</span></li>
                    </ul>
                </div>

                <div class="flex-align gap-8 flex-wrap">
                        <div class="position-relative text-gray-500 flex-align gap-4 text-13">
                            <span class="text-inherit">Sort by: </span>
                            <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                                <span class="text-lg"><i class="ph ph-funnel-simple"></i></span>
                                <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center">
                                    <option value="1" selected>Popular</option>
                                    <option value="1">Latest</option>
                                    <option value="1">Trending</option>
                                    <option value="1">Matches</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex-align text-gray-500 text-13 border border-gray-100 rounded-4 ps-20 focus-border-main-600 bg-white">
                            <span class="text-lg"><i class="ph ph-layout"></i></span>
                            <select class="form-control ps-8 pe-20 py-16 border-0 text-inherit rounded-4 text-center" id="exportOptions">
                                <option value="" selected disabled>Export</option>
                                <option value="csv">CSV</option>
                                <option value="json">JSON</option>
                            </select>
                        </div>
                </div>

            </div>
           

            <div class="card overflow-hidden">
                <div class="card-body p-0">
                    <table id="assignmentTable" class="table table-striped">
                        <thead>
                            <tr>
                                <th class="h6 text-gray-300">Students</th>
                                <th class="h6 text-gray-300">Lesson</th>
                                <th class="h6 text-gray-300">Deadline</th>
                                <th class="h6 text-gray-300">Sent</th>
                                <th class="h6 text-gray-300">Status</th>
                                <th class="h6 text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Jane Cooper</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Web & Mobile Design</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-teal-50 text-teal-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-teal-600 rounded-circle flex-shrink-0"></span>
                                        Send
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Albert Flores</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Graphics Design</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Dec 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Feb 18, 2025</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-warning-50 text-warning-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-warning-600 rounded-circle flex-shrink-0"></span>
                                        Checking
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Leslie Alexander</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Figma</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Feb 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-purple-50 text-purple-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-purple-600 rounded-circle flex-shrink-0"></span>
                                        Assigned
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Guy Hawkins</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Creating Web Design</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">June 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">June 21, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-danger-50 text-danger-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-danger-600 rounded-circle flex-shrink-0"></span>
                                        Decline
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Jacob Jones</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Complete Wordpress Course</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">June 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">July 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-green-50 text-green-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-green-600 rounded-circle flex-shrink-0"></span>
                                        Accepted
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Guy Hawkins</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Webflow Essentials Course</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Aug 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Sep 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Jacob Jones</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Beginners Guide to Design</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Sep 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Sep 22, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-pink-50 text-pink-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-pink-600 rounded-circle flex-shrink-0"></span>
                                        Not Submitted
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Albert Flores</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">AngularJS Crash Course </span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Oct 19, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Jenny Wilson</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Complete Wordpress Course</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Sep 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Dec 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Sunny Maria</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Responsive Web Design</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Oct 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Eleanor Pena</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Theme Development</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Oct 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Dec 20, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex-align gap-8">
                                        <img src={studentImg} alt="" class="w-40 h-40 rounded-circle" />
                                        <span class="h6 mb-0 fw-medium text-gray-300">Albert Flores</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Complete Python Bootcamp</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Nov 18, 2024</span>
                                </td>
                                <td>
                                    <span class="h6 mb-0 fw-medium text-gray-300">Dec 18, 2024</span>
                                </td>
                                <td>
                                    <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                                        <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                                        Active
                                    </span>
                                </td>
                                <td>
                                    <a href="#" class="bg-main-50 text-main-600 py-2 px-14 rounded-pill hover-bg-main-600 hover-text-white">View More</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer flex-between flex-wrap">
                    <span class="text-gray-900">Showing 1 to 10 of 12 entries</span>
                    <ul class="pagination flex-align flex-wrap">
                        <li class="page-item active">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">...</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">8</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">9</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link h-44 w-44 flex-center text-15 rounded-8 fw-medium" href="#">10</a>
                        </li>
                    </ul>
                </div>
            </div>

            
        </div>
        </>
    )
}
export default AssessmentHistory;