import React,{useState} from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbar from "../Navbars/SecondNavbar";
import Footer from "../Footer/Footer";
import "./Blog.css"
function Blog() {
  const [showFullContentOrganic, setShowFullContentOrganic] = useState(false);
  const [showFullContentPlastic, setShowFullContentPlastic] = useState(false);
  const [showFullContentGlass, setShowFullContentGlass] = useState(false);
  const handleReadMorePlastic = () => {
    setShowFullContentPlastic(true);
  };
  const handleReadMoreOrganic = () => {
    setShowFullContentOrganic(true);
  };
  const handleReadMoreGlass = () => {
    setShowFullContentGlass(true);
  };

  return (
    <div>
      <FirstNavbar />
      <SecondNavbar username="Waste/Collect Garbage" />
      <h1> Our Blogs</h1>
      <div className="page-layout">
        <div className="trashavalaible-container">
          <div className="trashavalaible-card">
            <div className="trashavalaible-card-details">
              <p>Organic Waste Management</p>

              <div className="trash-image">
                <img src="Types/organic.jpg" alt="organic" />

                <p>
                  {showFullContentOrganic ? (
                    <>
                      Organic waste, including food scraps and yard waste
                      constitutes a significant portion of municipal waste.
                      Composting facilities are established to transform organic
                      waste into nutrient-rich compost, which can be used in
                      agriculture and landscaping.
                    </>
                  ) : (
                    <>
                      Organic waste, including food scraps and yard waste constitutes a 
                      significant portion of municipal waste...
                      <br />
                      <br />
                      {!showFullContentOrganic && (
                        <button onClick={handleReadMoreOrganic}>
                          Read More
                        </button>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="trashavalaible-container">
          <div className="trashavalaible-card">
            <div className="trashavalaible-card-details">
              <p>Plastic Waste Management</p>
            
            <div className="trash-image">
              <img src="Types/plastic.jpg" alt="plastic" />

              <p>
                {showFullContentPlastic ? (
                  <>
                    Plastic waste is a major environmental concern due to its
                    non-biodegradable nature and harmful effects on ecosystems.
                    Effective plastic waste management strategies include
                    recycling, reducing single-use plastics, and promoting
                    alternative materials. Innovative solutions such as
                    plastic-to-fuel technology and ocean cleanup efforts are
                    also being explored to mitigate the impact of plastic
                    pollution.
                  </>
                ) : (
                  <>
                    Plastic waste is a major environmental concern due to its
                    non-biodegradable nature...
                    <br />
                    <br />
                    {!showFullContentPlastic && (
                      <button onClick={handleReadMorePlastic}>Read More</button>
                    )}
                  </>
                )}
              </p>
              </div>
            </div>
          </div>
        </div>
        <div className="trashavalaible-container">
          <div className="trashavalaible-card">
            <div className="trashavalaible-card-details">
              <p>Glass Waste Management</p>
            
            <div className="trash-image">
              <img src="Types/Glass.jpg" alt="plastic" />

              <p>
                {showFullContentGlass ? (
                  <>
                    Glass waste management involves recycling and repurposing
                    glass materials to minimize environmental impact. Glass is
                    infinitely recyclable, making it an ideal material for
                    reuse. Recycling facilities process glass waste into new
                    products such as bottles, jars, and fiberglass insulation.
                    Proper collection and sorting of glass waste are essential
                    to ensure efficient recycling processes.
                  </>
                ) : (
                  <>
                    Glass waste management involves recycling and repurposing
                    glass materials...
                    <br />
                    <br />
                    {!showFullContentGlass && (
                      <button onClick={handleReadMoreGlass}>
                        Read More
                      </button>
                    )}
                  </>
                )}
              </p>
              
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
