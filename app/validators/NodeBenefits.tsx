const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 me-3 mt-1">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function NodeBenefits() {
  return (
    <>
      <div className="row g-4 justify-content-center">
        {/* Legacy Validators */}
        <div className="col-lg-3 col-md-6">
          <div className="card-dark p-4 h-100 d-flex flex-column">
            <h2 className="h5 text-green mb-1">Legacy</h2>
            <div className="small text-white-50 mb-4">Original validators</div>
            <ul className="list-unstyled mb-4 small">
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">
                  <span className="text-white fw-semibold">10,000 VTRU</span> — 1,000 unlocked,
                  4,500 locked for 1 year, 4,500 locked for 2 years
                </span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">
                  <span className="text-white fw-semibold">131,500 Pretrend VIP units</span>
                </span>
              </li>
            </ul>
            <div className="mt-auto text-center">
              <a
                href="https://scope.vitruveo.ai/legacy"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm px-4"
              >
                Claim on Scope
              </a>
            </div>
          </div>
        </div>

        {/* Basic Node */}
        <div className="col-lg-3 col-md-6">
          <div className="card-dark p-4 h-100 d-flex flex-column">
            <h2 className="h5 text-green mb-1">Basic Node</h2>
            <div className="small text-white-50 mb-4">100 USDT</div>
            <ul className="list-unstyled mb-0 small">
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">
                  <span className="text-white fw-semibold">1 VTRU</span> per block mined for
                  five years (up to <span className="text-white fw-semibold">315,360 VTRU</span>)
                </span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom"><span className="text-white fw-semibold">10 VIBE shares</span></span>
              </li>
              <li className="d-flex">
                <Check />
                <span className="text-muted-custom">2-hr installation support available (+100 USDT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Super Node */}
        <div className="col-lg-3 col-md-6">
          <div className="card-dark p-4 h-100 d-flex flex-column">
            <h2 className="h5 text-green mb-1">Super Node</h2>
            <div className="small text-white-50 mb-4">200 USDT</div>
            <ul className="list-unstyled mb-0 small">
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">
                  <span className="text-white fw-semibold">2 VTRU</span> per block mined for
                  five years (up to <span className="text-white fw-semibold">630,720 VTRU</span>)
                </span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom"><span className="text-white fw-semibold">10 VIBE shares</span></span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">Eligible to be <span className="text-white fw-semibold">HOST Request Processor</span></span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">Eligible to be <span className="text-white fw-semibold">Bridge Notary</span></span>
              </li>
              <li className="d-flex">
                <Check />
                <span className="text-muted-custom">2-hr installation support available (+100 USDT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hyper Node */}
        <div className="col-lg-3 col-md-6">
          <div className="card-dark p-4 h-100 d-flex flex-column">
            <h2 className="h5 text-green mb-1">Hyper Node</h2>
            <div className="small text-white-50 mb-4">3,000 USDT</div>
            <ul className="list-unstyled mb-0 small">
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">
                  <span className="text-white fw-semibold">2 VTRU</span> per block mined for
                  five years (up to <span className="text-white fw-semibold">630,720 VTRU</span>)
                </span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom"><span className="text-white fw-semibold">10 VIBE shares</span></span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">Eligible to be <span className="text-white fw-semibold">HOST Request Processor</span></span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">Eligible to be <span className="text-white fw-semibold">Bridge Notary</span></span>
              </li>
              <li className="d-flex mb-3">
                <Check />
                <span className="text-muted-custom">Eligible to be <span className="text-white fw-semibold">Pretrend Notary</span></span>
              </li>
              <li className="d-flex">
                <Check />
                <span className="text-muted-custom"><span className="text-white fw-semibold">2-hr installation support included</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-white-50 small mt-4 mb-0">
        Rewards and eligibility apply while a node is Active (fully paid).
      </p>
    </>
  );
}
