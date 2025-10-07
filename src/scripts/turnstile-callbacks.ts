window.onTurnstileSuccess = (token: string) => {
  console.log("Turnstile success");
  const clickedButton = document.querySelector(
    "button[data-turnstile-button]",
  ) as HTMLButtonElement;

  console.log("Clicked button: ", clickedButton);

  if (clickedButton) clickedButton.disabled = false;
};
