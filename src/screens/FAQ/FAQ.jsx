import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

import FaqEntry from './FaqEntry'

import './FAQ.scss'

// eslint-disable-next-line react/prefer-stateless-function
export default class FAQPage extends React.PureComponent {
  render() {
    return (
      <div className="faq-page-div">
        <p className="faq-speech">
          <Typography>
            Cette page référence les questions fréquentes que vous pourrez vous
            posez sur l&apos;utilisation du site
          </Typography>
        </p>
        <FaqEntry
          question="Qu'est-ce que c'est ?"
          answer="Un site qui vous permet de jouer avec les pronostics du Mondial, entre amis ou en famille.
          À chaque bon pronostic, vous marquez un certain nombre de points, qui cumulés au fur et à mesure
          détermineront votre place dans le classement de votre tribu."
        />
        <FaqEntry
          question="Qu'est-ce qu'une tribu ?"
          answer="Votre/vos équipe(s), le regroupement des amis, connaissances, familles, avec lesquels vous aurez
          choisi de jouer."
        />
        <FaqEntry
          question="Comment participer ?"
          answer="Après vous être connecté avec votre compte Google ou Facebook (Un compte par profil de connexion. Si vous vous enregistrez avec votre compte Google pour créer
          ou rejoindre une/des tribu(s), il faudra poursuivre avec ce même compte pour poursuivre votre jeu), il vous faudra créer votre tribu ou rejoindre une tribu déjà existante.
          Via l'onglet correspondant dans le menu déroulant, entrez votre nom d'équipe, et vous voilà lancé
          dans l'aventure.
          Votre demande sera validée auprès de nos administrateurs, et vous recevrez un code d'accès à votre
          tribu.
          Pour pouvoir jouer, il vous faut impérativement un compte Facebook ou Google, sans quoi vous ne
          pourrez pas vous connecter."
        />
        <FaqEntry
          question="Administrer une tribu, qu'est-ce que ça implique ?"
          answer="L'administrateur de groupe va à la fois et créer et gérer sa tribu. Comment ? C'est à lui que revient
          la charge de transmettre les codes aux joueurs qu'il souhaite voir participer avec lui. Sans le code de
          tribu, un joueur ne peut accéder au groupe de jeu."
        />
        <FaqEntry
          question="Paiement Obligatoire ?"
          answer="Dans l'absolu, non. Vous pouvez jouer sans miser, cependant vous ne gagnerez rien à part le titre
          honorifique de champion de votre tribu. Chaque Tribu fixe son prix d'entrée, et les gains seront
          redistribués aux membres de l'équipe en fonction du classement de la tribu."
        />
        <FaqEntry
          question="Comment payer ?"
          answer={
            <Fragment>
              Si vous souhaitez créer une tribu payante, il faudra vous
              acquitter vous et les autres participants de la somme que vous
              aurez choisie. Pour ce faire, un lien vers la cagnotte PayPal de
              l&apos;organisation se génère. Le paiement s&apos;effectue
              uniquement (un compte paypal est de fait obligatoire afin de jouer
              en mode payant) via le site, et votre demande ne sera validée par
              nos administrateurs qu&apos;après le règlement intégral de la
              somme requise.
              <br />
              <i>
                Pour toute mise sur le jeu, 50% des fonds misés seront reversés
                à l&apos;association Pour un Ailleurs Meilleur.
              </i>
            </Fragment>
          }
        />
        <FaqEntry
          question="Comment rejoindre une Tribu ?"
          answer="Après cliqué sur Rejoindre une tribu dans le menu déroulant, il vous faudra rentrer le code que
          l'administrateur de la tribu vous aura envoyé (cf. Où se trouve le code ?) . C'est le seul moyen de
          rejoindre une tribu déjà existante."
        />
        <FaqEntry
          question="Comment savoir si je suis toujours en attente pour rejoindre une tribu ?"
          answer="Dans l'onglet mes tribus, vous aurez votre statut d'inscrit, ainsi que le montant que vous avez
          encore à régler avant de rejoindre telle ou telle équipe."
        />
        <FaqEntry
          question="Où se trouve le code ?"
          answer="Après création de votre tribu, et sa validation, le code s'affiche dans une fenêtre.
          Ce code, vous pourrez également le retrouver dans la section « Administrer mes tribus » du menu."
        />
        <FaqEntry
          question="Si j'ai parié une somme, combien puis-je espérer gagner à la fin du jeu ?"
          answer={
            <Fragment>
              Les gains seront répartis comme tel: <br />1<sup>ère</sup> place:
              55%, 2<sup>ème</sup> place: 30%, 3<sup>ème</sup> place: 15%
              <br />
              Le pourcentage s&apos;effectue sur la totalité des sommes misées
              (déduction faite des dons à l&apos;association PAM). Par exemple:{' '}
              <br />
              Nous sommes 10 personnes à jouer pour 15€ par personnes. 50% de la
              mise revient à PAM il reste donc un total de 75€ : 1<sup>
                ère
              </sup>{' '}
              place: 41,25€, 2<sup>ème</sup> place: 22,50€, 3<sup>ème</sup>{' '}
              place: 11,25€.
            </Fragment>
          }
        />
        <FaqEntry
          question="Puis-je faire partie/administrer plusieurs tribus ?"
          answer="Bien entendu, vous pouvez faire partie d'autant de tribu que vous le souhaitez. Le règlement général
          du site et les modalités d'inscriptions restent les mêmes que vous soyez dans une ou plusieurs
          tribus.
          Dans le cas où vous administrez plusieurs tribus, vous trouverez la liste complète des tribus que
          vous gérez depuis l'onglet correspondant. Vous y retrouverez également toutes les informations
          nécessaires à la bonne gestion de vos groupes."
        />
        <FaqEntry
          question="Ai-je besoin de plusieurs adresses mail ou profils Facebook pour m'inscrire dans
          des tribus différentes ?"
          answer="Absolument pas. Vous pouvez avoir autant de tribu que vous le désirez sur le même compte mail ou
          facebook. Si vous changez de compte de connexion, vous serez aux yeux du site un nouveau
          challenger, et il vous faudra vous inscrire ou réinscrire dans les tribus en suivant les modalités
          précédentes."
        />
        <FaqEntry
          question="J'ai pronostiqué sur le match de ce soir, mais le site n'a pas retenu ma proposition ?"
          answer="Les pronostics pour chaque match doivent être remplis sur le site avant le début de ceux-ci. Si vous
          avez lancé votre pronostic au tout début du match, il se peut très probablement que votre réponse
          n'ait pas été acceptée.
          Dans le cas contraire, vérifiez bien que vous vous êtes connecté avec le bon compte (cf. onglet
          Comment participer ?).
          Dans le cas où vous ne seriez pas concernés par ces deux cas, vous pouvez nous adressez votre
          requête par mail en vérifiant au préalable que vous avez bien suivis la démarche d'inscription."
        />
        <FaqEntry
          question="Je me suis inscris dans une tribu, j'ai payé et été débité, mais je ne retrouve pas ma tribu ?"
          answer="Vérifiez bien que vous vous êtes connectés avec le bon compte d'inscription. Si malgré tout le
          problème subsiste, contacter nos administrateurs à l'adresse suivante:
          naustra246@gmail.com"
        />
        <FaqEntry
          question="Lorsque je me suis connecté ce matin, les cotes étaient différentes, est-ce normal ?"
          answer={
            <Fragment>
              Oui, en effet, à chaque match joué les cotes évoluent. Toutes les
              cotes du site sont basées sur le site&nbsp;
              <a
                href="https://www.unibet.fr/sport/football/coupe-du-monde-2018/tous-les-matchs-coupe-dumonde-2018"
                target="_blank"
                rel="noreferrer"
              >
                UNIBET
              </a>
              , cotes que nous remettons régulièrement à jour afin que votre jeu
              soit le plus distrayant et proche de la réalité possible.
            </Fragment>
          }
        />
        <FaqEntry
          question="Pourquoi ne puis-je pas pronostiquer sur le gagnant de la coupe-du-monde ?"
          answer="Si vous avez émis ce pronostic après le 14 juin 17h, il est en effet trop tard (cf. règlement). Si ce n'est
          pas le cas, merci de nous envoyer un mail à naustra246@gmail.com avant la date du
          premier match de la coupe."
        />
        <FaqEntry
          question="Je suis sur smartphone, est-ce que cela change quelque chose ?"
          answer="Non, les règles et le mode de jeu ne change pas que vous soyez sur ordinateur ou sur smartphone.
          Petite astuce, pour voir les codes groupes sur smartphone, il vous faut tout simplement faire glisser
          le cadre dédié à cet effet vers la droite."
        />
        <FaqEntry
          question="J'ai trouvé un bug, comment puis-je le signaler ?"
          answer={
            <Fragment>
              Vous pouvez créer un rapport de bug (ou issue), sur le site&nbsp;
              <a
                href="https://github.com/mbernardeau/Road-to-Russia-2018/issues/new"
                target="_blank"
                rel="noreferrer"
              >
                GitHub du projet
              </a>
              . Il est aussi possible d&apos;envoyer un mail à
              naustra246@gmail.com décrivant le bug.
            </Fragment>
          }
        />
        <FaqEntry
          question="Que faites-vous de mes données personnelles ?"
          answer={
            <Fragment>
              Les données personnelles collectées le sont uniquement dans le but
              du jeu.&nbsp;
              <b>Aucune donnée ne sera réutilisée pour un autre objectif.</b>
              <br />
              <br />
              Vous pouvez consulter la politique de confidentialité complète{' '}
              <a
                href="https://github.com/mbernardeau/euro-2021/blob/master/confidentialite.md"
                target="_blank"
                rel="noreferrer"
              >
                ici
              </a>
              .
            </Fragment>
          }
        />

        <FaqEntry
          question="Mon problème n'est pas répertorié dans cette FAQ"
          answer="Vous pouvez nous envoyer votre requête à l'adresse naustra246@gmail.com. Nous vous
          répondrons le plus rapidement possible afin que votre expérience de jeu soit la plus réussie."
        />
      </div>
    )
  }
}
