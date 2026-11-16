const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const formState = {
  email: '',
  message: '',
};

const savedState = localStorage.getItem(STORAGE_KEY);

if (savedState) {
  try {
    const parsedState = JSON.parse(savedState);

    formState.email = parsedState.email ?? '';
    formState.message = parsedState.message ?? '';

    emailInput.value = formState.email;
    messageInput.value = formState.message;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!(name in formState)) {
    return;
  }

  formState[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formState });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  formState.email = '';
  formState.message = '';
});
