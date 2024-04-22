const form = document.querySelector('#form');
const list = document.querySelector('#list');
const propositionInput = document.querySelector('#proposition');
const categoryInput = document.querySelector('#category');
const propositions = [{ proposition: 'Hello', category: 'Greeting' }];
const API_BASE_URL = 'http://localhost:3000';

console.log(JSON.stringify(propositions));

//window.addEventListener('DOMContentLoaded', getPropositions);
// CORS error

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const proposition = form.elements['proposition'].value
  const category = form.elements['category'].value
  propositions.push({ proposition, category });
  renderPropositions();
  clearForm();
  focusInput();
  console.log(propositions);
});

function renderPropositions() {
  list.innerHTML = '';
  for (let proposition of propositions) {
    const li = document.createElement('li');
    li.innerText = `${proposition.proposition} - ${proposition.category}`;
    list.appendChild(li);
  }
}

function clearForm() {
  propositionInput.value = '';
  categoryInput.value = '';
}

function focusInput() {
  propositionInput.focus();
}

async function getPropositions() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/index`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    propositions.push(...data);
    renderPropositions();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
