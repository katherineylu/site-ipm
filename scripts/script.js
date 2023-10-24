/* envoyer un message par email */
function sendEmail(name,message)
{
  var handle ;
  var emailDest = "email@serveur.com";
  if(name == "" || message == "")
  {
    window.alert("Merci de renseigner votre nom et/ou votre message !");
  }
  else
  {
    //Puisque je n'ai pas de serveur j'utilise l'envoi de mail avec le gestionnaire de message de l'utilisateur
    //et je prérempli les infos
    handle = window.open('mailto:'+emailDest+'?subject=Contact de '+ name+'&body='+message);
    if(!handle)
    {// Si la popup n'a pas pu s'ouvrir, elle doit être bloquer par un bloqueur de popup 
      window.alert("Impossible d'ouvrir la fenêtre pour envoyer votre message !\nMerci de vérifier votre bloqueur de popup !");
    }
  }
  return true;
}

/* Modification du texte pour le nombre de caractères dans le message */
function textLabelMessage(iMsgLength,iMaxLength)
{
  var iCar = iMaxLength - iMsgLength;
  var strMsg = "";
  if (iCar == 0){
    strMsg="Votre message (" + (iMaxLength - iMsgLength) + " caractère restant.)"
  }
  else{
    strMsg="Votre message (" + (iMaxLength - iMsgLength) + " caractères restants.)"
  }
  document.getElementById("lblMessage").innerText = strMsg;
}

/* Pour compter le nombre de lettres*/
function countWordMessage(objMessage)
{
  var textMsg = objMessage.value;
  var iMsgLength = textMsg.length;
  var iMaxLength = objMessage.maxLength;
  var cursor = document.getElementById('cursor');
  cursor.style.height = 200- 2* iMsgLength*100 /iMaxLength +'px';
  textLabelMessage(iMsgLength,iMaxLength);
  return true;
}

/* Charge les différentes fonctions (si nécessaire) */
function loadFunction()
{
  var objMessage = document.getElementById('Message');
  var textMsg = objMessage.value;
  var iMsgLength = textMsg.length;
  var iMaxLength = objMessage.maxLength;
  textLabelMessage(iMsgLength,iMaxLength);
}
/* Heure et calendrier */
/* Clock*/

var clockID = 0;

// La fonction updateClock permet de mettre à jour l'horloge. C'est une fonction récursive
function UpdateClock() {
  // On récupère l'ID de du précédent appel de UpdateClock pour stopper le timer avec clearTimeout() afin d'éviter d'en lancer plusieurs en même temps (par précaution). 
  if(clockID) {
    clearTimeout(clockID);
    clockID  = 0;
  }
 
    // La fonction Date() permet de récupérer la date actuelle (Date + heure). Elle renvoit un objet de type Date sur lequel on peut appeler certaines méthodes pour récupérer ce que l'on souhaite
  var tDate = new Date();

  // On modifie la valeur de la balise s'appelant "theTime" et ayant pour parent la balise s'appelant "theClock" avec le texte suivant:
  var hours = tDate.getHours();
  var minutes = tDate.getMinutes();
  var secondes = tDate.getSeconds();
  document.theClock.theTime.value = "" 
    + (hours<10?'0'+ '' +hours:hours ) + ":" // permet de récupérer l'heure sur 2 chiffres
    + (minutes<10?'0'+ ''+minutes:minutes) + ":" // permet de récupérer les minutes sur 2 chiffres
    + (secondes<10?'0'+ ''+secondes:secondes); // permet de récupérer les secondes sur 2 chiffres
  
  /* La fonction setTimeout permet d'appeler une fonction après un nombre de millisecondes spécifié. Elle renvoie un ID qui peut être utilisé en paramètre de clearTimeout afin de stopper le timer.
  */
  clockID = setTimeout(UpdateClock, 1000); // On met à jour l'horloge en appelant à nouveau la fonction UpdateClock après 1000 millisecondes (1 seconde)
}
/* La fonction StartClock() est appelée lors du chargement de la balise <body> dans la page qui l'utilise.
Elle permet de lancer l'horloge.
*/

// La fonction KillClock est appelée lors du déchargement de la balise <body> dans la page qui l'utilise.
// Cela permet d'arrêter l'horloge
function KillClock() {
  if(clockID) {
    clearTimeout(clockID);
    clockID  = 0;
  }
}


/*Calendrier*/

function calendrier()
{
  var date = new Date(); // Création d'un objet Date avec la date du jour
  
  var jour = date.getDate(); // On récupère le jour (numéro) exemple 19 pour 19 décembre
  var mois = date.getMonth(); // On récupère le mois
  var annee = date.getFullYear(); // On récupère l'année

  // Création d'une liste des mois
  var mois_array = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
  var date_aujourdui = jour+' '+mois_array[mois]+' '+annee; // Variable texte écrivant la date du jour
 console.log(date_aujourdui);

  // Création d'une liste des nombre de jours par mois
 var jours_dans_moi = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  // On vérifie le cas des années bisextiles et on modifie le nombre de jours dans le mois de février
  if(annee%4 == 0 && annee!=1900)
  {
    jours_dans_moi[1]=29;
  }
  // On récupère le nombre de jours dans le mois actuel
  var total = jours_dans_moi[mois];
  var dep_j = new Date();// objet de type Date qui contient la date du jour => 19 décembre 2018 (si la date d'aujourd'hui est 19 décembre 2018)
 //console.log(dep_j);
  
  /*La méthode setDate() définit le jour du mois (relatif au début du mois courant) pour une date donnée*/
  dep_j.setDate(1);//fixer la date du premier jour du mois courant => 1 décembre

  
  /*La méthode getDate() retourne le jour du mois pour la date spécifiée d'après l'heure locale.*/
   dep_j = dep_j.getDay(); // On récupère le jour de la semaine, dep_j contient le numéro du jour (quel jour le 1er décembre => samedi => dep_j=6) 
  //console.log(dep_j);

  // On commence à écrire le document html
  // On crée un tableau et on écrit à la première ligne la date du jour
  document.write('<table class="cal_calendrier" ><tbody id="cal_body"><tr><th colspan="7">'+date_aujourdui+'</th></tr>');
  // Dans la deuxième ligne on écrite les jours de la semaine
  document.write('<tr class="cal_j_semaines"><th>Dim</th><th>Lun</th><th>Mar</th><th>Mer</th><th>Jeu</th><th>Ven</th><th>Sam</th></tr><tr>');
  // Dans la troisième ligne on écrit d'abord les numéros de jours du mois précédent jusqu'au premier jour du mois actuel (dep_j)
  var sem = 0;
  
  //pour écrire les jours dans le mois précédent
  for(var i=1;i<=dep_j;i++)
  {
    if(mois>0){// Si on est pas au mois de janvier, on affiche les jours du mois précédent
      document.write('<td class="cal_jours_av_ap">'+(jours_dans_moi[mois-1]-dep_j+i)+'</td>');
    }
    else{// Si on est au mois de janvier, on affiche les jours du mois de décembre donc en utilisant jours_dans_mois[11]
      document.write('<td class="cal_jours_av_ap">'+(jours_dans_moi[11]-dep_j+i)+'</td>');
    }
    sem++;
  }
  // Ensuite on écrit chaque jour du mois actuel dans une cellule
  for(i=1;i<=total;i++)
  {
    // Si on est au début de la semaine on crée une ligne, sem =0 => nouvelle semaine
    if(sem==0)
    {
      document.write('<tr>');
    }
    // Si i=le jour actuel alors on assigne une classe particulière à la cellule = 19. Elle sera utilisée dans le css pour écrire le jour en rouge
    if(jour==i)
    {
      document.write('<td class="cal_aujourdhui">'+i+'</td>');
    }
    // Sinon c'est une cellule normale
    else
    {
      document.write('<td>'+i+'</td>');
    }
    sem++; // incrémentation du nombre de jour dans la semaine

    // si on est à la fin de la semaine, on termine la ligne et on remet sem=0
    if(sem==7)
    {
      document.write('</tr>');
      sem=0;
    }
  }
  // Ensuite, on écrit les jours du mois suivant avec la classe cal_jours_av_ap. Si sem-0, on s'arrête
  for(i=1;sem!=0;i++)
  {
    document.write('<td class="cal_jours_av_ap">'+i+'</td>');
    sem++;
    // Si on arrive à la fin de la semaine, on met sem=0 pour s'arrêter et on termine la ligne
    if(sem==7)
    {
      document.write('</tr>');
      sem=0;
    }
  }
  // On termine le tableau
  document.write('</tbody></table>');
 
  return true;
}

