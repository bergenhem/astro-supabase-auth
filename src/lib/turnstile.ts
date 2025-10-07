const turnstileSecretKey = import.meta.env.TURNSTILE_SECRET_KEY;

export const validateTurnstile = async (token: string) => {
  try {
    const response = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          secret: turnstileSecretKey,
          response: token,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:  ", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
};
