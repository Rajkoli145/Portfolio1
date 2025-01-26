async function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to a plain object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log('Form data:', formObject);
    
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error(result.message || 'Error sending message');
        }
    } catch (error) {
        console.error('Error details:', error);
        alert('Error sending message: ' + error.message);
    }
}
