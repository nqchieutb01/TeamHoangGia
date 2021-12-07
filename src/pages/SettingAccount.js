import "./settingAccount.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SettingAccount() {
    return (
        <div className="bootstrap-inside">
            <div className="container rounded bg-white mt-5">

                <div className="row">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img src="https://i.imgur.com/0eg0aG0.jpg"
                                 className="rounded-circle mt-5" width="90"/>
                            <span
                                className="font-weight-bold">John Doe</span>
                            <span
                                className="text-black-50">john_doe12@bbb.com</span>
                            <span>United States</span>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex flex-row align-items-center back"><i
                                    className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                    <h6>Back to home</h6>
                                </div>
                                <h6 className="text-right">Edit Profile</h6>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 placeholder="first name" value="John"/></div>
                                <div className="col-md-6"><input type="text" className="form-control" value="Doe"
                                                                 placeholder="Doe"/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 placeholder="Email"
                                                                 value="john_doe12@bbb.com"/></div>
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 value="+19685969668"
                                                                 placeholder="Phone number"/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 placeholder="address"
                                                                 value="D-113, right avenue block, CA,USA"/></div>
                                <div className="col-md-6"><input type="text" className="form-control" value="USA"
                                                                 placeholder="Country"/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 placeholder="Bank Name" value="Bank of America"/></div>
                                <div className="col-md-6"><input type="text" className="form-control"
                                                                 value="043958409584095" placeholder="Account Number"/>
                                </div>
                            </div>
                            <div className="mt-5 text-right">
                                <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}