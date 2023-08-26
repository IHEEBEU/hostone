import React from "react";
import logo from "../assets/LOGO3.png";
import avatar from "../assets/avatar.png";
function Header({changes}) {

	return (
		<div>
			<div className="logo">
				<div className="top-head">
					<img className="logo-img" src={logo} />
					<div className="navigation">
						<a className="button" href="">
							<img
								className="user-pic"
								src={changes.pic}
								alt="Profile Image"
							/>   
							<div className="logout">LOGOUT</div>
						</a>
					</div>
				</div>
				<div className="main-search">
					<input
						type="text"
						name="text"
						className="search-input"
						pattern="[A-Za-z0-9 ]+"
						placeholder="Type smth to look for ..."
					/>
					<button className="search-btn">search</button>
				</div>
				<div className="navbar">
					<h4 onClick={changes.changeprofile}> PROFILE</h4>
					<h4 onClick={changes.changehome}> HOME</h4>
					<h4 onClick={changes.changenews}> NEWS</h4>
					<h4 onClick={changes.changecontact}> CONTACT US</h4>
				</div>
			</div>
		</div>
	);
}

export default Header;
