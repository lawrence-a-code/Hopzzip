document.addEventListener('DOMContentLoaded', function () {
    initializeSidebar();
    initializeNavigation();
    initializeCards();
});

function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardContainer = document.querySelector('.dashboard-container');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            dashboardContainer.classList.toggle('sidebar-collapsed');
            updateSidebarIcon();
        });
    }
}

function updateSidebarIcon() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const icon = sidebarToggle.querySelector('i');
    const dashboardContainer = document.querySelector('.dashboard-container');

    if (dashboardContainer.classList.contains('sidebar-collapsed')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const dashboardContainer = document.querySelector('.dashboard-container');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const page = this.getAttribute('data-page');
            loadPage(page);

            if (window.innerWidth <= 1024) {
                dashboardContainer.classList.add('sidebar-collapsed');
                updateSidebarIcon();
            }
        });
    });
}

function initializeCards() {
    const actionCards = document.querySelectorAll('.action-card');

    actionCards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');
            const navLink = document.querySelector(`.nav-link[data-page="${page}"]`);

            if (navLink) {
                navLink.click();
            }

            loadPage(page);
        });

        card.addEventListener('mouseenter', function () {
            animateCardHover(this);
        });
    });

    const staffLoginBtn = document.querySelector('.staff-login');
    if (staffLoginBtn) {
        staffLoginBtn.addEventListener('click', function () {
            handleStaffLogin();
        });
    }
}

function animateCardHover(card) {
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = '';
        }, 10);
    }
}

function loadPage(page) {
    const contentWrapper = document.getElementById('contentWrapper');

    const pages = {
        home: loadHomePage,
        'book-token': loadBookTokenPage,
        about: loadAboutPage,
        contact: loadContactPage,
        doctor: loadDoctorPage,
        pharmacy: loadPharmacyPage
    };

    if (pages[page]) {
        pages[page](contentWrapper);
    }
}

function loadHomePage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-home"></i>
                </div>
                <h1>Welcome to Hopzzip Hospital</h1>
                <p>Professional Healthcare Management System</p>
            </div>
        </div>

        <div class="cards-grid">
            <div class="card hover-pop action-card" data-page="book-token">
                <div class="card-icon">
                    <i class="fas fa-ticket-alt"></i>
                </div>
                <h3>Book Token</h3>
                <p>Schedule your appointment quickly and easily</p>
            </div>

            <div class="card hover-pop action-card" data-page="about">
                <div class="card-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <h3>About Hospital</h3>
                <p>Learn more about our facilities and services</p>
            </div>

            <div class="card hover-pop action-card" data-page="contact">
                <div class="card-icon">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h3>Contact Us</h3>
                <p>Get in touch with our support team</p>
            </div>

            <div class="card hover-pop action-card" data-page="doctor">
                <div class="card-icon">
                    <i class="fas fa-stethoscope"></i>
                </div>
                <h3>Doctor Portal</h3>
                <p>Access doctor dashboard and patient records</p>
            </div>

            <div class="card hover-pop action-card" data-page="pharmacy">
                <div class="card-icon">
                    <i class="fas fa-pills"></i>
                </div>
                <h3>Pharmacy</h3>
                <p>Manage prescriptions and medicine inventory</p>
            </div>

            <div class="card hover-pop emergency-card">
                <div class="card-icon">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h3>Emergency</h3>
                <p>24/7 Emergency Services Available</p>
                <div class="emergency-number">
                    <i class="fas fa-phone"></i> 911
                </div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card hover-pop">
                <div class="stat-value">24/7</div>
                <div class="stat-label">Emergency Care</div>
            </div>
            <div class="stat-card hover-pop">
                <div class="stat-value">50+</div>
                <div class="stat-label">Expert Doctors</div>
            </div>
            <div class="stat-card hover-pop">
                <div class="stat-value">200+</div>
                <div class="stat-label">Hospital Beds</div>
            </div>
            <div class="stat-card hover-pop">
                <div class="stat-value">15+</div>
                <div class="stat-label">Departments</div>
            </div>
        </div>
    `;

    initializeCards();
}

function loadBookTokenPage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-ticket-alt"></i>
                </div>
                <h1>Book Appointment Token</h1>
                <p>Schedule your visit with our specialists</p>
            </div>
        </div>

        <div style="max-width: 600px; margin: 0 auto;">
            <div class="card">
                <form style="display: flex; flex-direction: column; gap: 16px;">
                    <div>
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--gray-800);">Patient Name</label>
                        <input type="text" placeholder="Enter your name" style="width: 100%; padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif; transition: all 0.2s ease;" />
                    </div>

                    <div>
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--gray-800);">Email Address</label>
                        <input type="email" placeholder="your.email@example.com" style="width: 100%; padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif; transition: all 0.2s ease;" />
                    </div>

                    <div>
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--gray-800);">Department</label>
                        <select style="width: 100%; padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif; transition: all 0.2s ease;">
                            <option>Select Department</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Orthopedics</option>
                            <option>General Medicine</option>
                            <option>Pediatrics</option>
                        </select>
                    </div>

                    <div>
                        <label style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--gray-800);">Preferred Date</label>
                        <input type="date" style="width: 100%; padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif; transition: all 0.2s ease;" />
                    </div>

                    <button type="button" class="btn btn-primary" style="align-self: flex-start; cursor: pointer;" onclick="alert('Token booked successfully!')">
                        <i class="fas fa-check"></i> Book Token
                    </button>
                </form>
            </div>
        </div>
    `;
}

function loadAboutPage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-hospital"></i>
                </div>
                <h1>About Hopzzip Hospital</h1>
                <p>Excellence in Healthcare Services</p>
            </div>
        </div>

        <div class="cards-grid" style="margin-top: 24px;">
            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #059669, #047857);">
                    <i class="fas fa-heart"></i>
                </div>
                <h3>Our Mission</h3>
                <p>To provide exceptional healthcare services with compassion, integrity, and excellence to every patient we serve.</p>
            </div>

            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #1e40af, #1e3a8a);">
                    <i class="fas fa-eye"></i>
                </div>
                <h3>Our Vision</h3>
                <p>To be the leading hospital recognized for innovation, quality care, and patient satisfaction in the region.</p>
            </div>

            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #9333ea, #7e22ce);">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Our Values</h3>
                <p>Patient-centered care, integrity, teamwork, excellence, and continuous improvement in all we do.</p>
            </div>
        </div>

        <div class="card" style="margin-top: 24px;">
            <h3 style="margin-bottom: 16px;">Hospital Facilities</h3>
            <ul style="list-style: none; gap: 12px; display: flex; flex-direction: column;">
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> 200+ Hospital Beds</li>
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> 24/7 Emergency Services</li>
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> Advanced ICU Units</li>
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> Modern Operating Theaters</li>
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> Diagnostic Labs</li>
                <li><i class="fas fa-check" style="color: var(--primary-red); margin-right: 8px;"></i> Imaging Center</li>
            </ul>
        </div>
    `;
}

function loadContactPage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <h1>Contact Us</h1>
                <p>Get in touch with Hopzzip Hospital</p>
            </div>
        </div>

        <div class="cards-grid" style="margin-top: 24px;">
            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #0891b2, #0e7490);">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3>Address</h3>
                <p>123 Medical Plaza<br>Healthcare City<br>HC 12345</p>
            </div>

            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #2563eb, #1e40af);">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567<br>+1 (555) 987-6543<br>Emergency: 911</p>
            </div>

            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #dc2626, #991b1b);">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p>info@hopzzip.com<br>support@hopzzip.com<br>emergency@hopzzip.com</p>
            </div>

            <div class="card">
                <div class="card-icon" style="background: linear-gradient(135deg, #7c3aed, #6d28d9);">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>Hours</h3>
                <p>Mon - Fri: 8:00 AM - 8:00 PM<br>Sat - Sun: 9:00 AM - 6:00 PM<br>Emergency: 24/7 Open</p>
            </div>
        </div>

        <div class="card" style="margin-top: 24px;">
            <h3 style="margin-bottom: 16px;">Send us a Message</h3>
            <form style="display: flex; flex-direction: column; gap: 16px;">
                <input type="text" placeholder="Your Name" style="padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif;" />
                <input type="email" placeholder="Your Email" style="padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif;" />
                <textarea placeholder="Your Message" style="padding: 10px 12px; border: 2px solid var(--gray-200); border-radius: 8px; font-family: 'Poppins', sans-serif; min-height: 120px; resize: vertical;"></textarea>
                <button type="button" class="btn btn-primary" style="align-self: flex-start; cursor: pointer;" onclick="alert('Message sent successfully!')">
                    <i class="fas fa-paper-plane"></i> Send Message
                </button>
            </form>
        </div>
    `;
}

function loadDoctorPage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-stethoscope"></i>
                </div>
                <h1>Doctor Portal</h1>
                <p>Professional medical dashboard and patient management</p>
            </div>
        </div>

        <div class="cards-grid" style="margin-top: 24px;">
            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>Manage Patients</h3>
                <p>View and manage patient records and medical history</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h3>Appointments</h3>
                <p>View scheduled appointments and manage availability</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-prescription-bottle"></i>
                </div>
                <h3>Prescriptions</h3>
                <p>Create and manage patient prescriptions</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-file-medical"></i>
                </div>
                <h3>Reports</h3>
                <p>Generate medical reports and analytics</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-flask"></i>
                </div>
                <h3>Lab Results</h3>
                <p>Access and review laboratory test results</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-video"></i>
                </div>
                <h3>Telehealth</h3>
                <p>Conduct virtual consultations with patients</p>
            </div>
        </div>
    `;

    initializeCards();
}

function loadPharmacyPage(container) {
    container.innerHTML = `
        <div class="card hover-pop welcome-card">
            <div class="welcome-content">
                <div class="welcome-icon">
                    <i class="fas fa-pills"></i>
                </div>
                <h1>Pharmacy Management</h1>
                <p>Medicine inventory and prescription handling</p>
            </div>
        </div>

        <div class="cards-grid" style="margin-top: 24px;">
            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-box"></i>
                </div>
                <h3>Inventory</h3>
                <p>Manage medicine stock and supplies</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-receipt"></i>
                </div>
                <h3>Prescriptions</h3>
                <p>Process patient prescriptions</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3>Sales Report</h3>
                <p>View pharmacy sales and statistics</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>Expiry Check</h3>
                <p>Monitor medicine expiration dates</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <h3>Supplier Orders</h3>
                <p>Manage orders from suppliers</p>
            </div>

            <div class="card hover-pop action-card">
                <div class="card-icon">
                    <i class="fas fa-history"></i>
                </div>
                <h3>Transaction History</h3>
                <p>View all pharmacy transactions</p>
            </div>
        </div>
    `;

    initializeCards();
}

function handleStaffLogin() {
    alert('Redirecting to staff login page...');
}
