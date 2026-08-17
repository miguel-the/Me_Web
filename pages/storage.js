fetch('/https://me-web-tosx.onrender.com/pages/mahoako.html#5/visit')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not get visitor count');
        }

        return response.json();
    })
    .then(data => {
        document.getElementById('CounterVisitor').innerHTML = data.count;
    })
    .catch(error => {
        console.error('Visitor counter error:', error);

        document.getElementById('CounterVisitor').innerHTML = 'Error';
    });