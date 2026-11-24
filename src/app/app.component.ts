.main-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;

  h1 {
    color: #1a365d;
    margin: 0;
  }

  .error-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background-color: #fef2f2;
    border: 2px solid #dc2626;
    border-radius: 8px;
    color: #7f1d1d;

    p {
      margin: 0;
      font-weight: 600;
    }

    .retry-btn {
      padding: 0.5rem 1rem;
      background-color: #dc2626;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: #b91c1c;
      }
    }
  }

  .loading-banner {
    padding: 1rem 1.25rem;
    background-color: #eff6ff;
    border: 1px solid #93c5fd;
    border-radius: 8px;
    color: #1e3a8a;
    font-weight: 600;
  }

  .card {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 1rem 1.5rem;
    background-color: #f8fafc;

    h2 {
      margin-top: 0;
      color: #334155;
    }
  }

  aside {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 0.75rem 1rem;
    border-radius: 4px;

    p {
      margin: 0 0 0.5rem;
      color: #78350f;
    }
  }
}

@media (max-width: 600px) {
  .main-container {
    padding: 0.75rem;
    margin: 0.5rem auto;

    .error-banner {
      flex-direction: column;
      align-items: flex-start;
    }

    .card {
      padding: 1rem;
    }
  }
}
