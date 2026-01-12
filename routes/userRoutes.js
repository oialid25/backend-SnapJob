const express=require('express');
const router=express.Router();
const userController = require('../controllers/userContriller');
const verifyJWT=require('../middleware/verifyJWT')

router.use(verifyJWT)
router.get('/',userController.getAllUser)
router.get('/profil/',userController.getmyprofil)
router.get('/profil/:id',userController.getprofil)

router.get('/Applied/:id',userController.getApplied)


router.get('/home/:id',userController.gethomepage)


router.post('/home/:id/offre',userController.postoffre)
router.post('/home/:id/post',userController.postpost)


router.post('/profil/update/:id', userController.updateUser);
router.post('/profil/addExp/:id', userController.createxperience);
router.post('/profil/removeExp/:id', userController.removeexperience);

router.post('/profil/addEdu/:id', userController.creatEducation);
router.post('/profil/removeEdu/:id', userController.removeeducation);

router.post('/profil/addComp/:id', userController.creatcapabilitie);
router.post('/profil/removeComp/:id', userController.removecreatcapabilitie);

router.post('/profil/addCert/:id', userController.createCertification);

router.post('/profil/removeCert/:id', userController.removecertification);
router.post('/profil/creatCard/', userController.creatCard);

router.get('/offers/:offerId/candidates', userController.getCandidatesForOffer);
router.post('/offers/candidates/status', userController.updateCandidateStatus);


module.exports=router;