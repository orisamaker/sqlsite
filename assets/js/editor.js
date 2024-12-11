document.addEventListener('DOMContentLoaded', function() {
    // Find all exercises
    document.querySelectorAll('.exercise').forEach((exercise, index) => {
        const textarea = exercise.querySelector('.code'); // Select the textarea for SQL query input
        const lineNumbersContainer = exercise.querySelector('.line-numbers'); // Select the container for line numbers

        // Update line numbers for each textarea
        textarea.addEventListener('input', function() {
            updateLineNumbers(textarea, lineNumbersContainer);
        });

        function updateLineNumbers(textarea, lineNumbersContainer) {
            const lines = textarea.value.split('\n').length;
            const lineNumbers = Array.from({ length: lines }, (_, idx) => `<div>${idx + 1}</div>`).join('');
            lineNumbersContainer.innerHTML = lineNumbers;
        }

        // Initial update for each exercise when the page loads
        updateLineNumbers(textarea, lineNumbersContainer);
    });
});
   