let mySub = document.getElementById("sub");
let table = document.getElementById("myTable");
let mod = document.getElementById("modify");
let search = document.getElementById("search");
let reset = document.getElementById("reset");
let sel = document.getElementById("sel");
let sortname = document.getElementById("sortname");
let sortnote = document.getElementById("sortnote");

mySub.onclick = (e) => {
  e.preventDefault();

  // let nom = document.getElementById("nom").value;
  // let cin = document.getElementById("cin").value;
  // let note = document.getElementById("note").value;
  // let email = document.getElementById("email").value;
  let nom = $("#nom").val();
  let cin = $("#cin").val();
  let note = $("#note").val();
  let email = $("#email").val();

  if (!nom || !cin || !note || !email) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out all fields!",
    });
    return;
  }
  if (!Number(note)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The note must be a number!",
    });
    return;
  } else if (note < 0 || note > 20) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The note must be between 0 and 20!",
    });
    return;
  }

  let cinsearch = false;
  for (let i = 1; i < table.rows.length; i++) {
    if (cin === table.rows[i].cells[0].innerHTML) {
      cinsearch = true;
    }
  }

  if (cinsearch == true) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "CIN already exists!",
    });
    return;
  }

  let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
  if (emailRegex.test(email)) {
    console.log("Valid email address");
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid email address!",
    });
    return;
  }

  // document.getElementById("nom").value = "";
  // document.getElementById("cin").value = "";
  // document.getElementById("note").value = "";
  // document.getElementById("email").value = "";
  $("#nom").val("");
  $("#cin").val("");
  $("#note").val("");
  $("#email").val("");

  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);

  cell1.innerHTML = cin;
  cell2.innerHTML = nom;
  cell3.innerHTML = note;
  cell4.innerHTML = email;

  let editBtn = document.createElement("button");
  editBtn.setAttribute("class", "btn btn-info");
  editBtn.innerHTML = "Edit";
  editBtn.addEventListener("click", () => {
    document.getElementById("nom").value = row.cells[1].innerHTML;
    document.getElementById("cin").value = row.cells[0].innerHTML;
    document.getElementById("note").value = row.cells[2].innerHTML;
    document.getElementById("email").value = row.cells[3].innerHTML;
    document.getElementById("sub").style.display = "none";
    document.getElementById("modify").style.display = "block";
  });

  cell5.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "btn btn-danger");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Do you want to delete this Item?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        table.deleteRow(row.rowIndex);
        document.getElementById("sub").style.display = "block";
        document.getElementById("modify").style.display = "none";
        document.getElementById("nom").value = "";
        document.getElementById("cin").value = "";
        document.getElementById("note").value = "";
        document.getElementById("email").value = "";
        Swal.fire({
          text: "Item deleted successfully",
          target: "#custom-target",
          background: "var(--bs-danger-bg-subtle)",
          container: "position-absolute",
          toast: true,
          position: "bottom-right",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
      {
      }
    });
  });

  cell6.appendChild(deleteBtn);

  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", function () {
      selectedRow = this;
      // console.log(selectedRow)
      // console.log(table.rows[i].firstChild.innerHTML);
    });
    mod.onclick = () => {
      let newname = document.getElementById("nom").value;
      let newcin = document.getElementById("cin").value;
      let newnote = document.getElementById("note").value;
      let newemail = document.getElementById("email").value;
      if (selectedRow) {
        if (!newname || !newcin || !newnote || !newemail) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill out all fields!",
          });
          return;
        }
        selectedRow.cells[0].innerHTML = newcin;
        selectedRow.cells[1].innerHTML = newname;
        if (!Number(newnote)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The note must be a number!",
          });
          return;
        } else {
          selectedRow.cells[2].innerHTML = newnote;
        }
        selectedRow.cells[3].innerHTML = newemail;
        document.getElementById("nom").value = "";
        document.getElementById("cin").value = "";
        document.getElementById("note").value = "";
        document.getElementById("email").value = "";
        document.getElementById("sub").style.display = "block";
        document.getElementById("modify").style.display = "none";
        Swal.fire({
          text: "Item modified successfully",
          target: "#custom-target",
          background: "var(--bs-info-bg-subtle)",
          container: "position-absolute",
          toast: true,
          position: "bottom-right",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    };
  }
  Swal.fire({
    text: "Item added successfully",
    target: "#custom-target",
    background: "var(--bs-success-bg-subtle)",
    container: "position-absolute",
    toast: true,
    position: "bottom-right",
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

search.onclick = function ser() {
  let cinserch = document.getElementById("cinserch").value;
  for (let i = 1; i < table.rows.length; i++) {
    if (cinserch !== table.rows[i].cells[0].innerHTML) {
      // console.log(table.rows[i]);
      // table.rows[i].style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This CIN does not exist!",
      });
      return;
    } else if (cinserch === table.rows[i].cells[0].innerHTML) {
      table.rows[i].style.display = "table-row";
    }
  }
  document.getElementById("cinserch").value = "";
};
reset.onclick = function () {
  let cinserch = document.getElementById("cinserch").value;
  for (let i = 1; i < table.rows.length; i++) {
    if (cinserch !== table.rows[i].cells[0].innerHTML) {
      // console.log(table.rows[i]);
      table.rows[i].style.display = "table-row";
    }
  }
  document.getElementById("cinserch").value = "";
};
sel.onclick = function () {
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[2].innerHTML <= 9) {
      table.rows[i].style.display = "none";
    }
  }
};

let sort = true;
sortnote.onclick = () => {
  let rows = Array.from(table.rows);

  if (sort) {
    rows.sort((a, b) => {
      let noteA = Number(a.cells[2].innerHTML);
      let noteB = Number(b.cells[2].innerHTML);
      return noteB - noteA;
    });
  } else {
    rows.sort((a, b) => {
      let noteA = Number(a.cells[2].innerHTML);
      let noteB = Number(b.cells[2].innerHTML);
      return noteA - noteB;
    });
  }

  let tBody = table.tBodies[0];
  for (let i = 0; i < rows.length; i++) {
    tBody.appendChild(rows[i]);
  }

  sort = !sort;
};
