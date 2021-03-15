/* --------FORM in modal window------------- */
  const formModalRef = document.querySelector('[data-form-modal]');

  const takeFormData = event => {
    event.preventDefault();
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedData = {};

    formData.forEach((value, key) => {
      submittedData[key] = value;
    });

    console.dir(submittedData);
  };

    formModalRef && formModalRef.addEventListener('submit', takeFormData);
    /* ----------------------------------------- */

    const backdropRef =  document.querySelector("[data-backdrop]")

    function toggleModal() {
        backdropRef.classList.toggle("is-hidden");
    };

    formModalRef && formModalRef.addEventListener('submit', toggleModal);
    /* ----------------------------------------- */