import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { initStripe } from "./stripe";
import { CardWidget } from "./CardWidget";
import Box from "@mui/material/Box";
import { ThreeDots } from "../../node_modules/react-loader-spinner/dist/index";


let card = null;
const WalletAddress = () => {
  // Replace with your actual wallet address
  // const walletAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  const user = JSON.parse(localStorage.getItem("user"));

  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [StripeAccNum, setStripeAccNum] = useState("");
  const [maskedAddress, setMaskedAddress] = useState("");
  const [modalStripeDonate, setModalStripeDonate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user_id, setUser_id] = useState("");
  // console.log('StripeAccNum', StripeAccNum)
  // console.log('maskedAddress', maskedAddress)
  // console.log('token', token)
  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = walletAddress;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
  };

  useEffect(() => {
    setUser_id(user?._id);
  }, [user]);

  useEffect(() => {
    // setModalStripeDonate(true);
    // if (user && user.token) {
    // setToken(user?.token);
    const fetchData = async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
          },
        };
        const response = await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getWalletAddress`,
            config
          )
          .then((res) => {
            // console.log('setWalletAddress res',res)

            if (res.status === 200 || res.status === 201) {
              setWalletAddress(res?.data?.data?.walletAddress);
              // console.log('setWalletAddress',setWalletAddress)
              // Extract the first six and last eight characters
              if (walletAddress) {
                const firstSix = walletAddress.substring(0, 6);
                const lastEight = walletAddress.substring(
                  walletAddress.length - 8
                );
                setMaskedAddress(
                  firstSix + "................................." + lastEight
                );
              }
            } else {
              window.alert("Wallet Address not fount due to some issue!");
            }
          })
          .catch((error) => {
            window.alert(error);
          });
      } catch (error) {
        window.alert("API request failed", error);
        // console.error("API request failed", error);
      }
    };
    const fetchStripeAccount = async (token) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/compaign/getStripeAccount`,
          config
        );
  
        if (response.status === 200 || response.status === 201) {
          setStripeAccNum(response.data.data.stripeAccountNumber)
          // console.log('Stripe Account Data:', response.data);
          // console.log('Stripe setStripeAccNum Data:', setStripeAccNum);
        } else {
          window.alert("Stripe Account data not found due to some issue!");
        }
      } catch (error) {
        window.alert(error.message || "API request failed");
        // console.error("A/PI request failed", error);
      }
    };
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user) {
      setToken(user?.token);
      fetchData(user.token);
      fetchStripeAccount(user.token); // Call the new API
    }
    // Call the async function
  }, [walletAddress]);

  
  function handleModalClose() {
    setModalStripeDonate(false);
  }
 




  const handleStripeChange = async (e) => {
    e.preventDefault();
    const payload = {
      stripeAccountNumber: StripeAccNum,
    };
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer authentication, replace "Bearer" if you have a different authentication method
        },
      };
  
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/compaign/createStripAccount`,
        payload,
        config
      );
      // console.log('API response:', response.data);
      setModalStripeDonate(false)
    } catch (error) {
      // console.error('API request failed', error);
    }
  };
  return (
    <>
    <div className="d-flex justify-content">
  <div className={`${styles.wallet_address_container}`}>
    <h2>Crypto Wallet Address</h2>
    <div className={`${styles.wallet_address} ${copied ? "copied" : ""}`}>
      {maskedAddress}
      <button onClick={copyToClipboard}>
       {copied ? "✔" : "📋"}
      </button>
    </div>
  </div>

  <div className={`${styles.wallet_address_container}`}>
    {StripeAccNum ? (
      <div>
        <h2>Stripe Wallet Address</h2>
        <div className={`${styles.wallet_address}`}>
          {StripeAccNum}
          <button onClick={() => setModalStripeDonate(true)}>
            ✎
          </button>
        </div>
      </div>
    ) : (
      <div className={`${styles.wallet_address}`}>
      <Link
        to={"#"}
        className="btn btn-donate btn-primary w-100"
        data-bs-toggle="modal"
        data-bs-target="#modalDonate"
        onClick={() => setModalStripeDonate(true)}
      >
        <i className="flaticon-like me-3"></i> Connect Stripe Wallet
      </Link>
      </div>
    )}
  </div>
</div>
      
      <Modal
        className="modal fade modal-wrapper"
        id="modalDonate"
        show={modalStripeDonate}
        onHide={() => setModalStripeDonate(false)}
        // onEntered={initStripe} // Call initStripe when the modal is displayed
      >
        {loading ? (
          <Box className={styles.bars}>
            <ThreeDots color="#E6007C" width={50} height={50} />
          </Box>
        ) : (
          <>
            <div className="modal-header">
              {/* <h5 className="modal-title">Pay Now</h5> */}
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalStripeDonate(false)}
              >
                <i className="flaticon-close"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="col-lg-12">
                <div className="form-group">
                  {/* Your other form elements here */}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="form-label" style={{ marginBottom: "5px" }}>Account Number</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Account Number"
                      name="Amount"
                      value={StripeAccNum}
                      onChange={(e) => setStripeAccNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-12">
                <div id="card-element"></div>
              </div> */}
              <form>
                {/* <label style={{ fontSize: '14px', marginTop: '20px', fontWeight: '500' }}>Donate to System</label> */}
                {/* <div className={`d-flex ${styles.donation}`}>
                <div>
                  <input
                    type="radio"
                    name="percentage"
                    style={{ cursor: 'pointer' }}
                    onChange={() => setSelectedPercentage(2)}
                  />
                  <span className="ps-1">2%</span>
                </div>
                <div className="mx-5">
                  <input
                    type="radio"
                    name="percentage"
                    style={{ cursor: 'pointer' }}
                    onChange={() => setSelectedPercentage(5)}
                  />
                  <span className="ps-1">5%</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="percentage"
                    style={{ cursor: 'pointer' }}
                    onChange={() => setSelectedPercentage(10)}
                  />
                  <span className="ps-1">10%</span>
                </div>
              </div> */}
              </form>

              <div className="col-lg-12">
                <div className="form-group mb-0 text-center buttonMargin">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                    onClick={handleStripeChange}
                    style={{ marginTop: "25px" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* Call initStripe here to create the card element */}
          </>
        )}
      </Modal>
    </>
  );
};

export default WalletAddress;
