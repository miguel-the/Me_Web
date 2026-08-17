fetch('https://me-web-tosx.onrender.com/visit')
    .then(response => response.json())
    .then(data => {
        document.getElementById('CounterVisitor').innerHTML = data.count;
    })
    .catch(error => {
        console.error('Error getting visitor count:', error);
    });