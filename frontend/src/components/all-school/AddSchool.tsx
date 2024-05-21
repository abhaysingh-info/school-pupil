// import FA from "react-fontawesome";
import {useEffect, useState} from "react";
import {createSchool} from "../../services/school.service.ts"
import country_code from "../country_code.json"


function validateForm(formData) {
    const errors:{[key:string]: string} = {};

    // Name validation
    if (!formData.name || formData.name.trim() === "") {
        errors.name = "Name is required";
    }

    // Status validation
    if (!formData.status || !["pending", "published"].includes(formData.status)) {
        errors.status = "Invalid status. Please select pending or published";
    }

    // School Logo validation
    // if (!formData.school_logo || !/^(http|https):\/\/[^ "]+$/.test(formData.school_logo)) {
    //     errors.school_logo = "Invalid school logo URL. Must be an absolute URL";
    // }

    // Address validation
    if (!formData.address || formData.address.trim() === "") {
        errors.address = "Address is required";
    }

    // About validation
    if (!formData.about || formData.about.trim() === "") {
        errors.about = "About section is required";
    }

    // Filemaker ID validation
    if (!formData.filemaker || formData.filemaker.trim() === "") {
        errors.filemaker = "Filemaker ID is required";
    }

    // Number of Students validation
    if (!formData.noOfStudents || isNaN(formData.noOfStudents) || parseInt(formData.noOfStudents, 10) < 0) {
        errors.noOfStudents = "Number of Students must be a non-negative number";
    }

    // Number of Students validation
    if (!formData.countryCode || !/^\+[0-9]{1,4}$/.test(formData.countryCode) ) {
        errors.countryCode = "Please select valid Country Code";
    }

    // Website validation
    if (!formData.website || !/^(http|https):\/\/[^ "]+$/.test(formData.website)) {
        errors.website = "Invalid website URL. Must be an absolute URL";
    }

    // Phone Number validation
    if (!formData.phoneNumber || !/[0-9]{6,15}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = "Invalid phone number. Must start with + and be 6-11 digits";
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email address";
    }

    // Brand Color validations (allow empty but validate format if provided)
    if (formData.brandColor1 && !/^#[0-9A-F]{6}$/i.test(formData.brandColor1)) {
        errors.brandColor1 = "Invalid brand color format. Must be # followed by 6 hex digits";
    }
    if (formData.brandColor2 && !/^#[0-9A-F]{6}$/i.test(formData.brandColor2)) {
        errors.brandColor2 = "Invalid brand color format. Must be # followed by 6 hex digits";
    }

    // App Client validation
    if (typeof formData.appClient === "undefined") {
        errors.appClient = "Please select App Client option";
    }

    return errors;
}

export default function AddSchool() {

    const [errors, setErrors] = useState<{
        [key: string]: string | undefined
    }>({});

    useEffect(() => {
        setErrors({})
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        console.log(e.target.querySelector('input[name="school_logo"]').files[0])

        console.log(formData)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const data = {
            name: formData.get("name"),
            status: formData.get("status"),
            address: formData.get("address"),
            about: formData.get("about"),
            filemaker: formData.get("filemaker"),
            noOfStudents: formData.get("noOfStudents"),
            website: formData.get("website"),
            countryCode: formData.get("countryCode"),
            phoneNumber: formData.get("phoneNumber"),
            email: formData.get("email"),
            brandColor1: formData.get("brandColor1"),
            brandColor2: formData.get("brandColor2"),
            appClient: formData.get("appClient") === 'true' || true === formData.get("appClient"),
        }

        console.log(data)

        const errors = validateForm(data)
        if(Object.keys(errors).length > 0) {
            setErrors(errors)
            console.log(errors)
            return
        }else {
            setErrors({})
        }

        createSchool(formData).then(resp => {
            if(resp.details) {
                resp.details.forEach((d) => {
                    errors[d.context.key] = d.message
                })
            }

            window.location.href = "/"
        }).catch(err => {
            if(err.details) {
                err.details.forEach((d) => {
                    errors[d.context.key] = d.message
                })
            }

            console.log(err)
        })

        console.log(data)
    }

    return (<>
        <div className="px-2">
            <div className="flex flex-row flex-wrap justify-between gap-4 lg:mt-16">
                <div className="">
                    <h1 className={"text-3xl"}>Add New School</h1>
                </div>
            </div>
            <section className="mt-12">
                <form onSubmit={onSubmit}>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">School Name</span>
                        </div>
                        <input required={true} name="name" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["name"]}</span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Status</span>
                        </div>
                        <select defaultValue={"pending"} required={true} name="status"
                                className="select select-bordered">
                            <option value={"pending"}>Pending</option>
                            <option value={"published"}>Published</option>
                        </select>
                        <div className="label text-error">
                            <span className="label-text-alt">{errors["status"]}</span>
                        </div>
                    </label>


                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">School Logo</span>
                        </div>
                        <input required={true} type="file" name="school_logo"
                               className="file-input file-input-bordered w-full" accept={"image/*"}/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["school_logo"]}</span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Address</span>
                        </div>
                        <input required={true} name="address" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["address"]}</span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">About</span>
                        </div>
                        <input required={true} name="about" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["about"]}</span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Filemaker ID</span>
                        </div>
                        <input required={true} name="filemaker" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["filemaker"]}</span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">No of students in school*</span>
                        </div>
                        <input required={true} name="noOfStudents" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["noOfStudents"]}</span>
                        </div>
                    </label>
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Website*</span>
                        </div>
                        <input required={true} type="text" name="website" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["website"]}</span>
                        </div>
                    </label>


                    <div className="form-control max-w-md">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>

                        <div className="join">
                            <div className="join-item">
                                <select
                                    className="select select-bordered border-r-0 rounded-r-none"
                                    value={"+91"}
                                    name="countryCode"
                                >
                                    {country_code.map(country => <option value={country.dialCode} >
                                        {country.code} {country.dialCode}
                                    </option>)}

                                </select>
                            </div>
                            <div className="join-item w-full">
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full border-l-0 rounded-l-none"
                                    pattern="^[0-9]+$"
                                    minLength={10}
                                    maxLength={10}
                                    required
                                    name="phoneNumber"
                                />
                            </div>
                        </div>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["phoneNumber"]}</span>
                            <span className="label-text-alt text-error">{errors["countryCode"]}</span>
                        </div>
                    </div>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Email ID*</span>
                        </div>
                        <input required={true} name="email" type="text" placeholder="Type here"
                               className="input input-bordered w-full max-w-md"/>
                        <div className="label">
                            <span className="label-text-alt text-error">{errors["email"]}</span>
                        </div>
                    </label>
                    <div className="flex flex-wrap gap-8">
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Brand colour #1*</span>
                            </div>
                            <input required={true} name="brandColor1" type="text" placeholder="Type here"
                                   className="input input-bordered w-full max-w-md"/>
                            <div className="label">
                                <span className="label-text-alt text-error">{errors["brandColor1"]}</span>
                            </div>
                        </label>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Brand colour #2*</span>
                            </div>
                            <input required={true} name="brandColor2" type="text" placeholder="Type here"
                                   className="input input-bordered w-full max-w-md"/>
                            <div className="label">
                                <span className="label-text-alt text-error">{errors["brandColor2"]}</span>
                            </div>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer max-w-md justify-normal gap-4 flex-wrap">
                            <input name="appClient" type="checkbox"
                                   className="checkbox checkbox-primary"/>
                            <span>Is this school a ‘School App’ Client</span>
                        </label>
                    </div>
                    <label htmlFor="#" className="text-error">{errors["general"]}</label>
                    <div className="my-10 flex flex-wrap gap-2">
                        <button className="btn btn-primary btn-md rounded" type={"submit"}>Submit</button>
                        <button className="btn btn-md rounded" type={"reset"}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>

    </>)
}


