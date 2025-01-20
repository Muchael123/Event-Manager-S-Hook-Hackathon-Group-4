document.addEventListener("DOMContentLoaded", function() {
    const teamList = document.querySelector('.team-list');
    const teamMembers = document.querySelectorAll('.team-member');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0;

    function updateTeamDisplay() {
        // Calculate the new translate value
        const translateX = -currentIndex * 100; // Move left by 100% for each index
        teamList.style.transform = `translateX(${translateX}%)`;
    }

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : teamMembers.length - 1;
        updateTeamDisplay();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < teamMembers.length - 1) ? currentIndex + 1 : 0;
        updateTeamDisplay();
    });

    // Initialize display
    updateTeamDisplay();
});

