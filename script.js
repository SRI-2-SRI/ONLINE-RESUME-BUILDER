// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with one entry for each section
    addExperience();
    addEducation();
    addSkill();
});

function addExperience() {
    const container = document.getElementById('experienceFields');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <div class="input-group">
            <label>Job Title</label>
            <input type="text" class="exp-title" required>
        </div>
        <div class="input-group">
            <label>Employer</label>
            <input type="text" class="exp-employer" required>
        </div>
        <div class="input-group double">
            <div>
                <label>Start Date</label>
                <input type="month" class="exp-start" required>
            </div>
            <div>
                <label>End Date</label>
                <input type="month" class="exp-end">
            </div>
        </div>
        <div class="input-group">
            <label>Description</label>
            <textarea class="exp-description" rows="3"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeExperience(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeExperience(button) {
    const container = document.getElementById('experienceFields');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert("You need at least one experience entry.");
    }
}

function addEducation() {
    const container = document.getElementById('educationFields');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <div class="input-group">
            <label>Degree</label>
            <input type="text" class="edu-degree" required>
        </div>
        <div class="input-group">
            <label>Institution</label>
            <input type="text" class="edu-institution" required>
        </div>
        <div class="input-group double">
            <div>
                <label>Start Date</label>
                <input type="month" class="edu-start" required>
            </div>
            <div>
                <label>End Date</label>
                <input type="month" class="edu-end">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducation(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeEducation(button) {
    const container = document.getElementById('educationFields');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert("You need at least one education entry.");
    }
}

function addSkill() {
    const container = document.getElementById('skillsFields');
    const newEntry = document.createElement('div');
    newEntry.className = 'skill-entry';
    newEntry.innerHTML = `
        <div class="input-group">
            <label>Skill</label>
            <input type="text" class="skill-name" required>
        </div>
        <div class="input-group">
            <label>Proficiency</label>
            <select class="skill-level">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
            </select>
        </div>
        <button type="button" class="remove-btn" onclick="removeSkill(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeSkill(button) {
    const container = document.getElementById('skillsFields');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert("You need at least one skill entry.");
    }
}

function generateResume() {
    // Personal Information
    document.getElementById('previewName').textContent = document.getElementById('fullName').value || 'Your Name';
    document.getElementById('previewTitle').textContent = document.getElementById('jobTitle').value || 'Job Title';
    document.getElementById('previewEmail').innerHTML = `<i class="fas fa-envelope"></i> ${document.getElementById('email').value || 'email@example.com'}`;
    document.getElementById('previewPhone').innerHTML = `<i class="fas fa-phone"></i> ${document.getElementById('phone').value || '(123) 456-7890'}`;
    document.getElementById('previewAddress').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${document.getElementById('address').value || 'Your Address'}`;
    document.getElementById('previewSummary').textContent = document.getElementById('summary').value || 'Professional summary goes here. Highlight your key skills and experience.';

    // Experience
    const experienceContainer = document.getElementById('previewExperience');
    experienceContainer.innerHTML = '';
    
    const experienceEntries = document.querySelectorAll('.experience-entry');
    experienceEntries.forEach(entry => {
        const title = entry.querySelector('.exp-title').value || 'Job Title';
        const employer = entry.querySelector('.exp-employer').value || 'Company Name';
        const start = entry.querySelector('.exp-start').value || 'Month Year';
        const end = entry.querySelector('.exp-end').value || 'Month Year';
        const description = entry.querySelector('.exp-description').value || 'Job description and responsibilities.';
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <h4>${title}</h4>
            <p class="employer">${employer} | <span class="dates">${formatDate(start)} - ${end ? formatDate(end) : 'Present'}</span></p>
            <p class="description">${description}</p>
        `;
        experienceContainer.appendChild(experienceItem);
    });

    // Education
    const educationContainer = document.getElementById('previewEducation');
    educationContainer.innerHTML = '';
    
    const educationEntries = document.querySelectorAll('.education-entry');
    educationEntries.forEach(entry => {
        const degree = entry.querySelector('.edu-degree').value || 'Degree Name';
        const institution = entry.querySelector('.edu-institution').value || 'University Name';
        const start = entry.querySelector('.edu-start').value || 'Month Year';
        const end = entry.querySelector('.edu-end').value || 'Month Year';
        
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <h4>${degree}</h4>
            <p class="institution">${institution} | <span class="dates">${formatDate(start)} - ${end ? formatDate(end) : 'Present'}</span></p>
        `;
        educationContainer.appendChild(educationItem);
    });

    // Skills
    const skillsContainer = document.getElementById('previewSkills');
    skillsContainer.innerHTML = '<ul></ul>';
    const skillsList = skillsContainer.querySelector('ul');
    
    const skillEntries = document.querySelectorAll('.skill-entry');
    skillEntries.forEach(entry => {
        const name = entry.querySelector('.skill-name').value || 'Skill Name';
        const level = entry.querySelector('.skill-level').value || 'Proficiency Level';
        
        const skillItem = document.createElement('li');
        skillItem.textContent = `${name} - ${level}`;
        skillsList.appendChild(skillItem);
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function resetForm() {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        document.getElementById('resumeForm').reset();
        
        // Reset to one entry per section
        document.getElementById('experienceFields').innerHTML = '';
        document.getElementById('educationFields').innerHTML = '';
        document.getElementById('skillsFields').innerHTML = '';
        
        addExperience();
        addEducation();
        addSkill();
        
        // Reset preview
        document.getElementById('previewName').textContent = 'Your Name';
        document.getElementById('previewTitle').textContent = 'Job Title';
        document.getElementById('previewEmail').innerHTML = '<i class="fas fa-envelope"></i> email@example.com';
        document.getElementById('previewPhone').innerHTML = '<i class="fas fa-phone"></i> (123) 456-7890';
        document.getElementById('previewAddress').innerHTML = '<i class="fas fa-map-marker-alt"></i> Your Address';
        document.getElementById('previewSummary').textContent = 'Professional summary goes here. Highlight your key skills and experience.';
        document.getElementById('previewExperience').innerHTML = '<div class="experience-item"><h4>Job Title</h4><p class="employer">Company Name | <span class="dates">Month Year - Month Year</span></p><p class="description">Job description and responsibilities.</p></div>';
        document.getElementById('previewEducation').innerHTML = '<div class="education-item"><h4>Degree Name</h4><p class="institution">University Name | <span class="dates">Month Year - Month Year</span></p></div>';
        document.getElementById('previewSkills').innerHTML = '<ul><li>Skill Name - Proficiency Level</li></ul>';
    }
}

function downloadResume() {
    // Generate the resume first to ensure it's up to date
    generateResume();
    
    // Use html2canvas to capture the resume preview
    const element = document.getElementById('resumePreview');
    
    html2canvas(element, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true
    }).then(canvas => {
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add new page if content is too long
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Download the PDF
        pdf.save('resume.pdf');
    });
}