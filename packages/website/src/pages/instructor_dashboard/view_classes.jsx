// Code Requirement 27.1 - Instructor - View classes UI - Display a list of classes
// Code Requirement 22.2 - View Classes UI - Display buttons for adding, deleting, updating classes
// This code creates the Instructor's View Classes Page for the website
// Programmers name: Libby Miller
// Date: 09/24/2023
// Updtaed: 09/26/2023
// This pages sets up the UI, there are no pre or post conditions, and no inputs to this page

// import the necessary components
// import Navbar component
import Navbar from "@/components/navbar";
// import button component
import SolidColorButton from "@/components/SolidColorButton";
// import button component
import LightColorfulButton from "@/components/LightColorfulButton";
// import Footer component
import Footer from "@/components/footer";

// creates a static list of classes - this will need to be updated when we are pulling from database
var listItems = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

// creates the View Classes page
export default function View_Classes() {
  return (
    //creates a main html tag to hold the page 
    <main className="w-full overflow-hidden">
      <div className="py-6">
        <div className="container mx-auto">
        {/* This adds the navbar component to the page */}
          <Navbar />
        </div>
        <div className="container mx-auto mt-6 px-4">
          {/* creates two headers for the page title and subtitle */}
          <h1 className="text-3xl font-semibold mb-2">Instructor Dashboard</h1>
          <h2 className="text-2xl font-medium mb-6">View Classes</h2>
          <div className="flex space-x-4 mb-4">
            {/* creates the Add new class button, this will need to be updated once we have CRUD functionality */}
            <SolidColorButton title="Add New Class" link="/" />
            <SolidColorButton title="Manage Classes" link="/" />
          </div>
          {/* creates an html list, this will need to be refactored when pulling real data */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listItems.map((listItem, index) => (
            <li key={index} className="bg-white p-4 shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{listItem}</span>
                <div className="space-x-2">
                  <LightColorfulButton
                    shadowColor="#D1CDC7"
                    title="Update"
                    link="/"
                  />
                  <LightColorfulButton
                    shadowColor="#D1CDC7"
                    title="Delete"
                    link="/"
                  />
                </div>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
      {/* This section creates a container to hold the footer */}
      <div className="py-4 text-center text-sm text-gray-600">
        {/* This creates an instance of the footer component */}
        <Footer />
      </div> 
    </main>   
  );
};