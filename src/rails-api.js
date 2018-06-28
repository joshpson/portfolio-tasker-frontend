//User CRUD

function getUsers() {
  return fetch("https://task-vanilla-js-rails.herokuapp.com/api/v1/users").then(
    res => res.json()
  );
}

function postUser(username) {
  return fetch(`https://task-vanilla-js-rails.herokuapp.com/api/v1/users/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username })
  }).then(res => res.json());
}

//Project CRUD

function getProject(id) {
  return fetch(
    `https://task-vanilla-js-rails.herokuapp.com/api/v1/projects/${id}`
  ).then(res => res.json());
}

function postProject(data) {
  return fetch(`https://task-vanilla-js-rails.herokuapp.com/api/v1/projects/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function patchProject(project) {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  fetch(
    `https://task-vanilla-js-rails.herokuapp.com/api/v1/projects/${project.id}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project, getCircularReplacer())
    }
  ).then(res => res.json());
}

function deleteProject(project) {
  //not in use yet
  fetch(
    `https://task-vanilla-js-rails.herokuapp.com/api/v1/projects/${project.id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
}

//Task CRUD

function postTask(data) {
  return fetch(`https://task-vanilla-js-rails.herokuapp.com/api/v1/tasks/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function patchTask(task) {
  let data = {
    description: task.description,
    due_date: task.due_date,
    project_id: task.project_id,
    status: task.status
  };
  fetch(`https://task-vanilla-js-rails.herokuapp.com/api/v1/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}
