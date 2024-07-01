import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setform] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("/eyecross.svg")) {
      ref.current.src = "/eye.svg";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyecross.svg";
    }
  };

  const savePassword = () => {
    
      if(form.site.length > 3 &&form.username.length > 0 &&form.password.length > 3){
    
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, { ...form, id: uuidv4() }]);
      setform({site:"",username:"",password:""})
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }
    
    else{
      if(form.site.length<3){
        toast("Site's url length must be greater than 3", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
      else if(form.username.length===0){
        toast("Please enter a valid username", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
      else if(form.password.length<3){
        toast("Password length is too small, we suggest you to use a long and strong password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyItem = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const handleEdit = (id) => {
    let newpasswordArray = passwordArray.filter((item) => {
      return item.id != id;
    });
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(newpasswordArray);
  };

  const handleDelete = (id) => {
    let cnf = confirm("Do you really want to delete this password ?");
    if (cnf) {
      let newPasswordArrray = passwordArray.filter((item) => {
        return item.id != id;
      });
      setpasswordArray(newPasswordArrray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArrray));
      toast("Password Deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container flex flex-col  ">
        <div className="flex justify-center items-center flex-col ">
          <h1 className="logo text-4xl p-4 px-6 font-bold h-15">
            <span className=" ">&lt;</span>
            <span className="">Pass</span>
            <span className="text-orange-500">OP/&gt;</span>
          </h1>
          <p className=" pb-4 font-bold text-pretty text-lg">
            Your Own Password Manager
          </p>
          
          <div className="w-3/4 flex flex-col gap-5 ">
          <div className="input flex flex-col gap-1">
            <div className="siteName">
              <input
                name="site"
                value={form.site}
                onChange={handleChange}
                placeholder="Enter the site url"
                className="border border-red-200 rounded-full w-full px-2 "
                type="text"
              />
            </div>
            <div className="details flex flex-col md:flex-row justify-between gap-1 ">
              <input
                name="username"
                onChange={handleChange}
                value={form.username}
                placeholder="Enter your username"
                className="border border-red-200 rounded-full md:w-3/4 px-2 "
                type="text"
              />
              <div className="md:w-1/4  relative">
                <input
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="Enter your password"
                  className="border border-red-200 rounded-full w-full px-2"
                  ref={passwordRef}
                />
                <span className="absolute w-5 right-1 top-1 cursor-pointer ">
                  <img ref={ref} onClick={showPassword} src="/eye.svg" alt="" />
                </span>
              </div>
            </div></div>
            <div className="savebtn flex justify-center">
              <button
                onClick={savePassword}
                className="w-fit flex justify-center gap-2 items-center rounded-full bg-orange-600 my-8 px-4 py-2 text-white hover:bg-orange-700"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                ></lord-icon>
                Save Password
              </button>
            </div>

            <h1 className="abolute font-bold text-2xl mx-3">Your Passwords</h1>

            <div className="tabular overflow-auto ">
              {passwordArray.length === 0 && (
                <div className="font-md mx-3 ">No passwords to display</div>
              )}
              {passwordArray.length > 0 && (
                <table className="table-auto w-full bg-orange-100  ">
                  <thead className="bg-orange-700 ">
                    <tr>
                      <th className="py-2 min-w-32">Site</th>
                      <th className="py-2 min-w-32">Username</th>
                      <th className="py-2 min-w-32">Password</th>
                      <th className="py-2 min-w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passwordArray.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="border border-white">
                            <div className="flex justify-center items-center gap-2 p-2 ">
                              <span>
                                <a href={item.site} target="_blank">
                                  {item.site}
                                </a>
                              </span>
                              <div
                                onClick={() => copyItem(item.site)}
                                className="cursor-pointer"
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingRight: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="border border-white">
                            <div className="flex justify-center items-center gap-2 p-2">
                              <span>{item.username} </span>
                              <div
                                onClick={() => copyItem(item.username)}
                                className="cursor-pointer"
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="border border-white">
                            <div className="flex justify-center items-center gap-2 p-2">
                              <span>{item.password} </span>
                              <div
                                onClick={() => copyItem(item.username)}
                                className="cursor-pointer"
                              >
                                <lord-icon
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    paddingTop: "3px",
                                    paddingLeft: "3px",
                                  }}
                                  src="https://cdn.lordicon.com/iykgtsbt.json"
                                  trigger="hover"
                                ></lord-icon>
                              </div>
                            </div>
                          </td>
                          <td className="border border-white ">
                            <div className="flex justify-center gap-2 items-center  p-2">
                              <span
                                onClick={() => handleEdit(item.id)}
                                className="editbtn cursor-pointer"
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/gwlusjdu.json"
                                  trigger="hover"
                                  style={{ width: "25px", height: "25px" }}
                                ></lord-icon>
                              </span>
                              <span
                                onClick={() => handleDelete(item.id)}
                                className="deletebtn cursor-pointer"
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/skkahier.json"
                                  trigger="hover"
                                  style={{ width: "25px", height: "25px" }}
                                ></lord-icon>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
