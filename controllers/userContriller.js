require('../middleware/verifyJWT')
const bcrypt = require('bcrypt');
const user = require('../models/user')
const offre = require('../models/offre')
const post = require('../models/post')
const experience = require('../models/experience')
const education = require('../models/education')
const capabilitie = require('../models/capabilities')
const certification = require('../models/certification')
const card = require('../models/card')
const INCLURE_COMP = require('../models/INCLURE_COMP')
const INCLURE_EDUCATION = require('../models/INCLURE_EDUCATION')
const INCLURE_CERT = require('../models/INCLURE_CERT')
const INCLURE_EXP = require('../models/INCLURE_EXP')
const INCLURE_PROJ = require('../models/INCLURE_PROJ')
const statue = require('../models/statue')
const project = require('../models/project')



const getAllUser = async (req, res) => {
    const users = await user.find({}).select('-password').lean();
    if (!users || users.length === 0) {
        return res.json({ message: 'not found' })
    }
    res.json(users)
}
const getUser = async (req, res) => {
    try {
        const newUser = await user.findOne({ user_name: req.params.id });
        if (!newUser) {
            return res.json({ message: 'not exist' })
        }
        res.json(newUser)
    }
    catch (error) {
        console.log(error)
    }
}
const getprofil = async (req, res) => {
    try {
        const myrealUser = await user.findById(req.user).select('-password');
        const myUser = await user.findById(req.params.id).select('-password');
        if (!myUser) {
            return res.json({ message: 'User not found' });
        }
        const myExperiences = await experience.find({ userid: req.params.id.toString() });
        const myEducations = await education.find({ userid: req.params.id.toString() });
        const myCapabilities = await capabilitie.find({ userid: req.params.id.toString() });
        const myCertifications = await certification.find({ userid: req.params.id.toString() });

        res.render('hisprofil', {
            myUser,
            myprofil: true,
            myExperiences,
            myEducations,
            myCapabilities,
            myCertifications,
            myrealUser
        });

    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error' });
    }
}



const getmyprofil = async (req, res) => {
    try {
        const myUser = await user.findById(req.user).select('-password');
        if (!myUser) {
            return res.json({ message: 'User not found' });
        }
        const myExperiences = await experience.find({ userid: req.user.toString() });
        const myEducations = await education.find({ userid: req.user.toString() });
        const myCapabilities = await capabilitie.find({ userid: req.user.toString() });
        const myCertifications = await certification.find({ userid: req.user.toString() });

        res.render('profil', {
            myUser,
            myprofil: true,
            myExperiences,
            myEducations,
            myCapabilities,
            myCertifications
        });

    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error' });
    }
}


const getApplied = async (req, res) => {
    try {
        const myUser = await user.findById(req.user).select('-password');
        const finduser = await user.findById(req.params.id).select('-password');
        if (!myUser) {
            return res.json({ message: 'User not found' });
        }

        const myOffresDocs = await offre.find({ userid: req.user.toString() });
        
        const myOffresWithCount = [];
        for (const offer of myOffresDocs) {
            const count = await card.countDocuments({ id_offre: offer._id });
            
            const offerObj = offer.toObject();
            offerObj.candidateCount = count;
            
            myOffresWithCount.push(offerObj);
        }

        const myApplications = await card.find({ userid: req.user.toString() });
        const applicationsWithStatus = [];

        for (const application of myApplications) {
            const findStatus = await statue.findOne({ id_card: application._id });
            let status = 'Pending';
            if (findStatus) {
                if (findStatus.status === 'accepted') {
                    status = 'Accepted';
                } else {
                    status = 'Rejected';
                }
            }
            
            const relatedOffer = await offre.findById(application.id_offre);
            let a = application.toObject();
            a.status = status;
            
            if (relatedOffer) {
                a.offerTitle = relatedOffer.titre; 
                a.companyName = relatedOffer.username; 
            } else {
                a.offerTitle = "Job Unavailable";
                a.companyName = "-----";
            }
            applicationsWithStatus.push(a);
        }

        const offerId = req.query.offerId;
        const candidateIndex = parseInt(req.query.index) || 0;
        let currentCandidate = null;
        let allCandidates = [];
        let acceptedCandidatesList = [];

        if (offerId) {
            const cards = await card.find({ id_offre: offerId });
            const statusRecords = await statue.find({ id_offre: offerId });
            const reviewedCardIds = statusRecords.map(s => s.id_card.toString());

            for (const cardItem of cards) {
                if (reviewedCardIds.includes(cardItem._id.toString())) continue;

                const cardUser = await user.findById(cardItem.userid).select('-password');
                                const compLinks = await INCLURE_COMP.find({ id_card: cardItem._id });
                const competencies = [];
                for (const link of compLinks) {
                    const comp = await capabilitie.findById(link.Comp_id);
                    if (comp) { competencies.push(comp) };
                }
                const eduLinks = await INCLURE_EDUCATION.find({ id_card: cardItem._id });
                const educations = [];
                for (const link of eduLinks) {
                    const edu = await education.findById(link.Formation_id);
                    if (edu) { educations.push(edu) };
                }
                const certLinks = await INCLURE_CERT.find({ id_card: cardItem._id });
                const certifications = [];
                for (const link of certLinks) {
                    const cert = await certification.findById(link.Cert_id);
                    if (cert) { certifications.push(cert) };
                }
                const expLinks = await INCLURE_EXP.find({ id_card: cardItem._id });
                const experiences = [];
                for (const link of expLinks) {
                    const exp = await experience.findById(link.Exp_id);
                    if (exp) { experiences.push(exp) };
                }
                
                allCandidates.push({ 
                    card: cardItem, 
                    user: cardUser,
                    competencies: competencies,
                    educations: educations,
                    certifications: certifications,
                    experiences: experiences
                }); 
            }
            
            if (allCandidates.length > 0 && candidateIndex < allCandidates.length) {
                currentCandidate = allCandidates[candidateIndex];
            }
                        const acceptedStats = await statue.find({ id_offre: offerId, status: 'accepted' });
            for (const stat of acceptedStats) {
                 const accCard = await card.findById(stat.id_card);
                 if (accCard) {
                     const accUser = await user.findById(accCard.userid).select('first_name last_name profilePic user_name _id');
                     acceptedCandidatesList.push({ user: accUser, card: accCard });
                 }
            }
        }

        res.render('Appliedorjob', {
            myUser,
            finduser,
            myOffres: myOffresWithCount, 
            myApplications: applicationsWithStatus,
            currentCandidate: currentCandidate,
            offerId: offerId,
            candidateIndex: candidateIndex,
            totalCandidates: allCandidates.length,
            acceptedCandidates: acceptedCandidatesList
        });

    } catch (error) {
        console.log(error);
        res.json({ message: 'Server error' });
    }
}

const updateUser = async (req, res) => {
    if (req.params.id.toString() !== req.user.toString()) {
        return res.send("Unauthorized");
    }

    try {
        const newData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            description: req.body.description,
            profilePic: req.body.profilePic,
            coverPicture: req.body.coverPicture
        };

        if (req.body.password) {
            const newpassword = await bcrypt.hash(req.body.password, 10);
            newData.password = newpassword;
        }

        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            newData,
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ message: "User not found" });
        }
        res.redirect('/user/profil/');

    } catch (error) {
        console.log(error);
        res.json({ message: "Server error" });
    }
}



const gethomepage = async (req, res) => {
    if (req.params.id.toString() !== req.user.toString()) {
        return res.json({ message: "You can reach your profile home page only" });
    }
    try {
        const finduser = await user.findById(req.params.id).select('-password');
        const posts = await post.find().sort({ createdAt: -1 });
        const offres = await offre.find().sort({ createdAt: -1 });
        const myUser = await user.findById(req.params.id).select('-password');
        const count = await user.countDocuments();
        const randomSkip = Math.floor(Math.random() * Math.max(0, count - 3));
        const suggestions = await user.find().skip(randomSkip).limit(3);

        let mylist = [];
        let i = 0;
        let j = 0;
        while (i < posts.length || j < offres.length) {
            let randomint = Math.floor(Math.random() * 100);
            let addPost = false;
            if (i < posts.length && j < offres.length) {
                addPost = (randomint % 2 === 0);
            } else if (i < posts.length) {
                addPost = true;
            } else {
                addPost = false;
            }

            if (addPost) {
                mylist.push(['post', posts[i]]);
                i++;
            } else {
                mylist.push(['offre', offres[j]]);
                j++;
            }
        }

        const myExperiences = await experience.find({ userid: req.params.id.toString() });
        const myEducations = await education.find({ userid: req.params.id.toString() });
        const myCapabilities = await capabilitie.find({ userid: req.params.id.toString() });
        const myCertifications = await certification.find({ userid: req.params.id.toString() });

        res.render('index', { myUser, finduser, mylist, myExperiences, myEducations, myCapabilities, myCertifications,suggestions });

    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}
const postoffre = async (req, res) => {
    try {
        const userid = req.params.id
        const { title, type_emploi, description, place } = req.body
        if (!title || !type_emploi || !place || !description) { return res.send("Please fill all the gaps"); };

        const findoffre = await offre.findOne({ titre: title }).exec()

        if (findoffre) {
            return res.send('this offre allredy exist change the title');
        }
        const foundUser = await user.findById(userid);
        const Offre = await offre.create({ titre: title, type_emploi, Description: description, lieu_travail: place, userid, username: foundUser.user_name, profilePic: foundUser.profilePic })
        res.redirect('/user/home/' + userid);
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}
const postpost = async (req, res) => {
    try {
        const userid = req.params.id
        const { content } = req.body
        if (!content) { return res.send("Please fill all the gaps"); };
        const foundUser = await user.findById(userid)
        const newpost = await post.create({ content, userid, username: foundUser.user_name, profilePic: foundUser.profilePic })
        res.redirect('/user/home/' + userid);
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}
const createxperience = async (req, res) => {

    try {
        const { Date_debut, Date_fin, Type, enterprise, Poste, description } = req.body
        if (!Date_debut || !Date_fin || !Type || !enterprise || !Poste || !description) { return res.send("Please fill all the gaps") }
        const newExperience = await experience.create({ Date_debut, Date_fin, Type, enterprise, Poste, description, userid: req.user.toString() })
        res.redirect('/user/profil/');
    } catch (error) {
        res.send("Server Error");
    }
}


const removeexperience = async (req, res) => {

    try {
        const { Poste, enterprise } = req.body;
        if (!Poste || !enterprise) {
            return res.send("Please fill Post and Enterprise");
        }
        const find = await experience.findOneAndDelete({ Poste: Poste, enterprise: enterprise });
        if (!find) {
            return res.send("not exist");
        }
        res.redirect('/user/profil/');
    } catch (error) {
        res.send("Server Error");
    }
}








const creatEducation = async (req, res) => {

    try {
        const { ecole, diplome, date_debut, date_fin, Grade, Description } = req.body
        if (!ecole || !diplome || !date_debut || !Grade ) { return res.send("Please fill all the gaps") }
        const newEducation = await education.create({ ecole, diplome, date_debut, date_fin, Grade, Description, userid: req.user.toString() })
        console.log(newEducation);
        res.redirect('/user/profil/');

    } catch (error) {
        res.send("Server Error"+error);
    } capabilitie
}

const removeeducation = async (req, res) => {

    try {
        const { ecole, diplome } = req.body;
        if (!ecole || !diplome) {
            return res.send("Please fill school and diplome");
        }
        const find = await education.findOneAndDelete({ ecole, diplome });
        if (!find) {
            return res.send("not exist");
        }
        res.redirect('/user/profil/');
    } catch (error) {
        res.send("Server Error");
    }
}

const creatcapabilitie = async (req, res) => {

    try {
        const { title, type, niveau } = req.body
        if (!title || !type || !niveau) { return res.send("Please fill all the gaps") }
        const newcapabilitie = await capabilitie.create({ title, type, niveau, userid: req.user.toString() })
        console.log(newcapabilitie);
        res.redirect('/user/profil/');

    } catch (error) {
        res.send("Server Error");
    }
}

const removecreatcapabilitie = async (req, res) => {

    try {
        const { title } = req.body
        if (!title) { return res.send("Please fill all the gaps") }
        const newcapabilitie = await capabilitie.findOneAndDelete({ title })
        res.redirect('/user/profil/');

    } catch (error) {
        res.send("Server Error");
    }
}

const createCertification = async (req, res) => {

    try {
        const { titre, organisme } = req.body
        if (!titre || !organisme) { return res.send("Please fill all the gaps") }
        const newCertification = await certification.create({ titre, organisme, userid: req.user.toString() })
        console.log(newCertification);
        res.redirect('/user/profil/');

    } catch (error) {
        res.send("Server Error");
    }
}
const removecertification = async (req, res) => {

    try {
        const { titre } = req.body;
        if (!titre) {
            return res.send("Please fill titre");
        }
        const find = await certification.findOneAndDelete({ titre });
        if (!find) {
            return res.send("not exist");
        }
        res.redirect('/user/profil/');
    } catch (error) {
        res.send("Server Error");
    }
}





const creatCard = async (req, res) => {
    try {
        const { description, selected_items, id_offre } = req.body;

        if (!description) {
            return res.send("Please fill description");
        }

        if (!id_offre) {
            return res.send("Offre ID is required");
        }

        const myUser = await user.findById(req.user).select('-password');
        if (!myUser) {
            return res.send("User not found");
        }

        const newCard = await card.create({
            username: myUser.user_name,
            id_offre: id_offre,
            Description: description,
            userid: req.user.toString()
        });

        const cardId = newCard._id;

        if (selected_items && Array.isArray(selected_items)) {
            for (const itemId of selected_items) {
                const foundCapability = await capabilitie.findById(itemId);
                if (foundCapability) {
                    await INCLURE_COMP.create({
                        id_card: cardId,
                        Comp_id: itemId
                    });
                    continue;
                }

                const foundEducation = await education.findById(itemId);
                if (foundEducation) {
                    await INCLURE_EDUCATION.create({
                        id_card: cardId,
                        Formation_id: itemId
                    });
                    continue;
                }

                const foundCertification = await certification.findById(itemId);
                if (foundCertification) {
                    await INCLURE_CERT.create({
                        id_card: cardId,
                        Cert_id: itemId
                    });
                    continue;
                }

                const foundExperience = await experience.findById(itemId);
                if (foundExperience) {
                    await INCLURE_EXP.create({
                        id_card: cardId,
                        Exp_id: itemId
                    });
                    continue;
                }
            }
        }

        res.redirect('/user/home/' + req.user.toString());
    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
}








const getCandidatesForOffer = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const findOffre = await offre.findById(offerId);
        if (!findOffre) {
            return res.json({ message: 'Offer not found' });
        }

        if (findOffre.userid.toString() !== req.user.toString()) {
            return res.send("Unauthorized");
        }
        const cards = await card.find({ id_offre: offerId });
        const statusRecords = await statue.find({ id_offre: offerId });
        const reviewedCardIds = [];
        for (let i = 0; i < statusRecords.length; i++) {
            const idString = statusRecords[i].id_card.toString();
            reviewedCardIds.push(idString);
        }

        const candidatesData = [];
        for (const cardItem of cards) {
            if (!(reviewedCardIds.includes(cardItem._id.toString()))) {


                const cardUser = await user.findById(cardItem.userid).select('-password');
                const compLinks = await INCLURE_COMP.find({ id_card: cardItem._id });
                const competencies = [];
                for (const link of compLinks) {
                    const comp = await capabilitie.findById(link.Comp_id);
                    if (comp) { competencies.push(comp) };
                }

                const eduLinks = await INCLURE_EDUCATION.find({ id_card: cardItem._id });
                const educations = [];
                for (const link of eduLinks) {
                    const edu = await education.findById(link.Formation_id);
                    if (edu) { educations.push(edu) };
                }
                const certLinks = await INCLURE_CERT.find({ id_card: cardItem._id });
                const certifications = [];
                for (const link of certLinks) {
                    const cert = await certification.findById(link.Cert_id);
                    if (cert) { certifications.push(cert) };
                }

                const expLinks = await INCLURE_EXP.find({ id_card: cardItem._id });
                const experiences = [];
                for (const link of expLinks) {
                    const exp = await experience.findById(link.Exp_id);
                    if (exp) { experiences.push(exp) };
                }
                const projLinks = await INCLURE_PROJ.find({ id_card: cardItem._id });
                const projects = [];
                for (const link of projLinks) {
                    const proj = await project.findById(link.title);
                    if (proj) { projects.push(proj) };
                }
                candidatesData.push({
                    card: cardItem,
                    user: cardUser,
                    competencies: competencies,
                    educations: educations,
                    certifications: certifications,
                    experiences: experiences,
                    projects: projects
                });
            }
        }
        res.json({ candidates: candidatesData, offer: findOffre });
    } catch (error) {
        res.send("Error" + error);
    }
}

const updateCandidateStatus = async (req, res) => {
    try {
        const { cardId, offerId, status, index } = req.body;
        if (!cardId || !offerId || !status) {
            return res.send("Please fill the gaps");
        }
        const findOffre = await offre.findById(offerId);
        if (!findOffre) {
            return res.send("not found");
        }
        if (findOffre.userid.toString() !== req.user.toString()) {
            return res.send("Unauthorized");
        }
        const findCard = await card.findById(cardId);
        if (!findCard) {
            return res.send("not found");
        }
        const existingStatus = await statue.findOne({
            id_card: cardId,
            id_offre: offerId
        });
        if (existingStatus) {
            return res.send("This candidate already reviewed");
        }
        const myUser = await user.findById(req.user).select('-password');
        const newstatue = await statue.create({
            id_card: cardId,
            user_name: myUser.user_name,
            status: status,
            id_offre: offerId
        });

        const nextIndex = parseInt(index) + 1;
        res.redirect('/user/Applied/' + req.user.toString() + '?offerId=' + offerId + '&index=0');
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
}













module.exports = {
    getAllUser,
    getUser,
    getmyprofil,
    updateUser,
    gethomepage,
    postoffre,
    postpost,
    createxperience,
    creatEducation,
    creatcapabilitie,
    createCertification,
    removeexperience,
    removeeducation,
    removecreatcapabilitie,
    removecertification,
    getprofil,
    getApplied,
    creatCard,
    getCandidatesForOffer,
    updateCandidateStatus,
}