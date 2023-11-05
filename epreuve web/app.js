// Récupérer les éléments HTML
const jsonDataInput = document.getElementById('jsonData');
const generatePdfButton = document.getElementById('generatePdfButton');
const pdfPreview = document.getElementById('pdfPreview');

// Écouter le clic sur le bouton de génération de PDF
generatePdfButton.addEventListener('click', () => {
    const jsonData = jsonDataInput.value;

    // Assurez-vous que le champ de données JSON n'est pas vide
    if (!jsonData) {
        alert('Veuillez entrer des données JSON.');
        return;
    }

    try {
        // Analyser les données JSON
        const data = JSON.parse(jsonData);

        // Générer le PDF à l'aide de la bibliothèque pdfmake
        const docDefinition = {
            content: [
                { text: 'PDF généré à partir de données JSON', style: 'header' },
                data,  // Insérez ici vos données JSON sous forme de tableau ou d'objet
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                }
            },
        };

        pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
            // Afficher l'aperçu du PDF généré
            pdfPreview.innerHTML = `<iframe src="${dataUrl}" width="100%" height="400"></iframe>`;
        });
    } catch (error) {
        alert('Erreur lors de l\'analyse des données JSON : ' + error.message);
    }
});
