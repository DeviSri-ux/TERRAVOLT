export class AuthScreen {
  constructor(navigate) {
    this.navigate = navigate;

    const params = new URLSearchParams(window.location.search);
    this.mode = params.get('mode') || 'login';
  }

  render() {
    const div = document.createElement('div');

    div.className =
      'min-h-screen w-full relative flex items-center justify-center px-6 py-8';

    div.style.backgroundImage =
      'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=80)';

    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundAttachment = 'fixed';

    const isRegister = this.mode === 'register';

    const title = isRegister
      ? 'Create Your Account'
      : 'Welcome Back';

    const submitText = isRegister
      ? 'Create Account'
      : 'Sign In';

    const toggleText = isRegister
      ? 'Already have an account? Sign In'
      : "Don't have an account? Sign Up";

    let html = `
      <div class="w-full max-w-md z-10 bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl">

        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">
            ${title}
          </h2>

          <p class="text-gray-600">
            TERRAVOLT 2.0
          </p>
        </div>

        <form id="authForm" class="space-y-4">
    `;

    // SIGN UP FIELDS
    if (isRegister) {
      html += `
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
        >
      `;
    }

    // EMAIL FIELD
    html += `
      <input
        type="email"
        id="email"
        placeholder="Enter your email address"
        required
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
      >
    `;

    // PASSWORD FIELD
    html += `
      <div style="position:relative;">
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          style="
            width:100%;
            padding:12px 48px 12px 16px;
            border:1px solid #d1d5db;
            border-radius:12px;
          "
        >

        <button
          type="button"
          id="togglePwd"
          aria-label="Show or hide password"
          style="
            position:absolute;
            right:10px;
            top:50%;
            transform:translateY(-50%);
            background:none;
            border:none;
            cursor:pointer;
            font-size:18px;
            color:#1f2937;
          "
        >
          &#128065;
        </button>
      </div>
    `;

    // PASSWORD SECURITY INFORMATION
    if (isRegister) {
      html += `
        <p class="text-xs text-gray-500 -mt-2">
          Password must contain at least 8 characters, including uppercase,
          lowercase, a number and a special character.
        </p>
      `;
    }

    // CONFIRM PASSWORD
    if (isRegister) {
      html += `
        <div style="position:relative;">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            style="
              width:100%;
              padding:12px 48px 12px 16px;
              border:1px solid #d1d5db;
              border-radius:12px;
            "
          >

          <button
            type="button"
            id="toggleConfirmPwd"
            aria-label="Show or hide confirm password"
            style="
              position:absolute;
              right:10px;
              top:50%;
              transform:translateY(-50%);
              background:none;
              border:none;
              cursor:pointer;
              font-size:18px;
              color:#1f2937;
            "
          >
            &#128065;
          </button>
        </div>
      `;
    }

    // SUBMIT BUTTON
    html += `
          <button
            type="submit"
            class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
          >
            ${submitText}
          </button>

        </form>

        <div class="mt-6 space-y-2 text-center">

          <button
            id="toggle"
            type="button"
            class="text-green-700 font-medium"
          >
            ${toggleText}
          </button>

          <br>

          <button
            id="back"
            type="button"
            class="text-gray-500 text-sm hover:text-gray-700"
          >
            Back to Welcome
          </button>

        </div>

      </div>
    `;

    div.innerHTML = html;

    // PASSWORD SHOW / HIDE
    const pwd = div.querySelector('#password');
    const togglePwd = div.querySelector('#togglePwd');

    if (togglePwd && pwd) {
      togglePwd.onclick = () => {
        if (pwd.type === 'password') {
          pwd.type = 'text';
          togglePwd.innerHTML = '&#128584;';
        } else {
          pwd.type = 'password';
          togglePwd.innerHTML = '&#128065;';
        }
      };
    }

    // CONFIRM PASSWORD SHOW / HIDE
    if (isRegister) {
      const confirmPwd = div.querySelector('#confirmPassword');
      const toggleConfirmPwd =
        div.querySelector('#toggleConfirmPwd');

      if (toggleConfirmPwd && confirmPwd) {
        toggleConfirmPwd.onclick = () => {
          if (confirmPwd.type === 'password') {
            confirmPwd.type = 'text';
            toggleConfirmPwd.innerHTML = '&#128584;';
          } else {
            confirmPwd.type = 'password';
            toggleConfirmPwd.innerHTML = '&#128065;';
          }
        };
      }
    }

    // FORM SUBMISSION
    div.querySelector('#authForm').onsubmit = async (e) => {
      e.preventDefault();

      const email =
        div.querySelector('#email').value.trim();

      const password = pwd.value;

      const nameEl =
        div.querySelector('#name');

      const name =
        isRegister && nameEl
          ? nameEl.value.trim()
          : '';

      // SIGN UP VALIDATION
      if (isRegister) {
        const confirmEl =
          div.querySelector('#confirmPassword');

        const confirm =
          confirmEl
            ? confirmEl.value
            : '';

        if (!name) {
          alert('Please enter your full name.');
          return;
        }

        if (password !== confirm) {
          alert('Passwords do not match.');
          return;
        }

        // Password security:
        // 8+ characters
        // uppercase
        // lowercase
        // number
        // special character
        const passwordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

        if (!passwordPattern.test(password)) {
          alert(
            'Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character.'
          );
          return;
        }
      }

      try {
        const endpoint = isRegister
          ? '/api/auth/register'
          : '/api/auth/login';

        const body = isRegister
          ? { name, email, password }
          : { email, password };

        // Automatically works with localhost on laptop
        // and the laptop IP when opened from another device.
        const apiBaseUrl =
          `http://${window.location.hostname}:5000`;

        const res = await fetch(
          apiBaseUrl + endpoint,
          {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
          }
        );

        const data = await res.json();

        if (data.token) {
          localStorage.setItem(
            'token',
            data.token
          );

          localStorage.setItem(
            'user',
            JSON.stringify(data.user)
          );

          // After successful Sign Up or Sign In
          this.navigate('/language');

        } else {
          alert(
            data.msg ||
            'Unable to continue. Please try again.'
          );
        }

      } catch (err) {
        console.error(
          'Authentication error:',
          err
        );

        alert(
          'Error connecting to server. Please make sure the backend server is running.'
        );
      }
    };

    // SWITCH BETWEEN SIGN IN AND SIGN UP
    div.querySelector('#toggle').onclick = () => {
      const nextMode = isRegister
        ? 'login'
        : 'register';

      this.navigate(
        '/auth?mode=' + nextMode
      );
    };

    // BACK TO WELCOME PAGE
    div.querySelector('#back').onclick = () => {
      this.navigate('/');
    };

    return div;
  }
}