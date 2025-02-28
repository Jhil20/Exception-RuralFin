<Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} className="mb-6">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {!props.showAgent && activeStep == 0 && (
            <Formik
              initialValues={{
                full_name: profileData.full_name || "",
                phone_number: profileData.phone_number || "",
                email: profileData.email || "",
                gender: profileData.gender || "",
                age: profileData.age || "",
                income: profileData.income || "",
                budget_limit: profileData.budget_limit || "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={handleNext}
            >
              <Form className="space-y-4 flex flex-wrap ">
                {/* Full Name */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Full Name*
                  </label>
                  <Field
                    name="full_name"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Phone Number*
                  </label>
                  <Field
                    name="phone_number"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Gender */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Gender*
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md custom-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Age */}
                <div className="flex-2/12">
                  <label className="block text-gray-700 mb-1 ml-1">Age*</label>
                  <Field
                    type="text"
                    name="age"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Income */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Income*
                  </label>
                  <Field
                    type="number"
                    name="income"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="income"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Budget Limit */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Budget Limit*
                  </label>
                  <Field
                    type="number"
                    name="budget_limit"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="budget_limit"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {props.error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign Up
                </button> */}
                <Box
                  sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  className="w-full"
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <button type="submit">
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </button>
                </Box>
              </Form>
            </Formik>
          )}

          {!props.showAgent && activeStep == 1 && (
            <Formik
              initialValues={{
                address: "",
                city: "",
                pincode: "",
                state: "",
                user_pin: "",
              }}
              validationSchema={signupValidationSchema2}
              onSubmit={handleUserSignupSubmit}
            >
              <Form className="space-y-4 flex flex-wrap w-full">
                {/* Address */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Street Address*
                  </label>
                  <Field
                    name="address"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <CityAutocomplete />

                {props.error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign Up
                </button> */}
                <Box
                  sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  className="w-full"
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Box sx={{ flex: "1 1 auto" }} className="cursor-pointer" />

                  <button type="submit">Sign Up</button>
                </Box>
              </Form>
            </Formik>
          )}

          <div className="w-full flex justify-center h-fit">
            <h1
              className="cursor-pointer w-fit text-center text-gray-700"
              onClick={() => {
                props.setShowLogin(true);
              }}
            >
              Already have an account? Signin!!
            </h1>
          </div>
        </>
      )}
    </Box>