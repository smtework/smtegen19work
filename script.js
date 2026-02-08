// ใส่ config Firebase ของตัวเองตรงนี้
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addTask() {
  let pass = prompt("ใส่รหัสก่อนเพิ่มงาน");

  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  const title = document.getElementById("title").value;
  const due = document.getElementById("due").value;

  if (!title) {
    alert("กรอกชื่องานก่อน");
    return;
  }

  db.collection("tasks").add({
    title: title,
    due: due
  });

  document.getElementById("title").value = "";
  document.getElementById("due").value = "";
}

function loadTasks() {
  db.collection("tasks").onSnapshot(snapshot => {
    let html = "";

    snapshot.forEach(doc => {
      const t = doc.data();

      html += `
        <div class="task">
          <b>${t.title}</b><br>
          📅 ${t.due}<br>
          <button onclick="deleteTask('${doc.id}')">ลบ</button>
        </div>
      `;
    });

    document.getElementById("taskList").innerHTML = html;
  });
}

function deleteTask(id) {
  let pass = prompt("ใส่รหัสก่อนลบ");

  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  db.collection("tasks").doc(id).delete();
}

loadTasks();
