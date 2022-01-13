import { saveTask, deleteTask, onGetTasks, getTask, editTask } from "./firebase.js";

const container = document.getElementById("tasks-container");
let isEditinig = false;
let taskId = "";

window.addEventListener("DOMContentLoaded", async () => {
	onGetTasks((snapshot) => {
		let html = "";

		snapshot.forEach((doc) => {
			const task = doc.data();
			html += `
                <div class="task card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
					<button class='btn-delete btn btn-danger btn-sm' data-id="${doc.id}">Delete</button>
                    <button class='btn-edit btn btn-success btn-sm' data-id="${doc.id}">Editar</button>
					</div>
                </div>
            `;
		});

		container.innerHTML = html;

		const btn_delete = container.querySelectorAll(".btn-delete");
		const btn_edit = container.querySelectorAll(".btn-edit");

		btn_delete.forEach((btn) => {
			btn.addEventListener("click", ({ target: { dataset } }) => {
				const id = dataset.id;
				deleteTask(id);
			});
		});

		btn_edit.forEach((btn) => {
			btn.addEventListener("click", async ({ target: { dataset } }) => {
				const id = dataset.id;
				taskId = id;
				const task = await getTask(id);

				taskForm["title"].value = task.data().title;
				taskForm["description"].value = task.data().description;
				isEditinig = true;
				taskForm["btn-task-save"].innerText = "Actualizar";
			});
		});
	});
});

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = taskForm["title"];
	const descripction = taskForm["description"];

	const newField = {
		title: title.value,
		description: descripction.value,
	};

	!isEditinig ? saveTask(title.value, descripction.value) : editTask(taskId, newField);

	taskForm.reset();
	isEditinig = false;
	taskId = "";
	taskForm["btn-task-save"].innerText = "Guardar";
});
