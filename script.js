// Fetch Classes
fetch('http://localhost:3000/classes')
    .then(response => response.json())
    .then(classes => {
        const classSelect = document.getElementById("class");
        classes.forEach(classObj => {
            const option = document.createElement("option");
            option.value = classObj.class_id;
            option.textContent = classObj.class_name;
            classSelect.appendChild(option);
        });
    });

// Fetch Subjects for a selected Class
document.getElementById('class').addEventListener('change', function() {
    const classId = this.value;
    fetch(`http://localhost:3000/subjects/${classId}`)
        .then(response => response.json())
        .then(subjects => {
            const subjectSelect = document.getElementById('subject');
            subjectSelect.innerHTML = '';
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.subject_id;
                option.textContent = subject.subject_name;
                subjectSelect.appendChild(option);
            });
        });
});

// Fetch Chapters for a selected Subject
document.getElementById('subject').addEventListener('change', function() {
    const subjectId = this.value;
    fetch(`http://localhost:3000/chapters/${subjectId}`)
        .then(response => response.json())
        .then(chapters => {
            const chapterSelect = document.getElementById('chapter');
            chapterSelect.innerHTML = '';
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.value = chapter.chapter_id;
                option.textContent = chapter.chapter_name;
                chapterSelect.appendChild(option);
            });
        });
});

// Display Images after Submit
document.getElementById("submit-btn").addEventListener('click', function() {
    const chapterId = document.getElementById('chapter').value;
    fetch(`http://localhost:3000/images/${chapterId}`)
        .then(response => response.json())
        .then(images => {
            const imageContainer = document.getElementById("image-container");
            imageContainer.innerHTML = '';
            images.forEach(image => {
                const imgWrapper = document.createElement("div");
                imgWrapper.classList.add("img-wrapper");

                const imgElement = document.createElement("img");
                imgElement.src = image.image_path;
                imgElement.alt = image.image_path;
                imgWrapper.appendChild(imgElement);

                const likeBtn = document.createElement("button");
                likeBtn.textContent = `Like (${image.likes})`;
                likeBtn.addEventListener('click', () => {
                    fetch('http://localhost:3000/like-image', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ imageId: image.image_id })
                    })
                    .then(response => response.json())
                    .then(() => {
                        likeBtn.textContent = `Like (${image.likes + 1})`;
                    });
                });

                imgWrapper.appendChild(likeBtn);
                imageContainer.appendChild(imgWrapper);
            });
        });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});