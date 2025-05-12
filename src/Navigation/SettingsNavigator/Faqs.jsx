import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Accordion from '../../components/Accordian';
import {ScrollView} from 'moti';
import BackButton from '../../components/Backbutton';

const Faqs = () => {
  const faqs = [
    {
      question: 'What is ClickedArt.com?',
      answer:
        'ClickedArt.com is an Indian platform launched globally to empower photographers by providing a space to showcase their work, create catalogs, and earn through the sale of high-resolution images in digital or print format.',
    },
    {
      question: 'Who can register as a photographer on ClickedArt.com?',
      answer:
        'Any creative photographer, whether professional or hobbyist, can register. You must own the rights to the images you upload.',
    },
    {
      question: 'Is there a registration fee for photographers?',
      answer:
        'Basic membership is free. However, Intermediate and Premium memberships offer additional features and benefits at a nominal fee.',
    },
    {
      question: 'How do I register as a photographer?',
      answer:
        "Visit ClickedArt.com and click on 'Sell your Photos'. Complete the registration form, provide the necessary details, and submit for approval.",
    },
    {
      question: 'What information is required to register?',
      answer:
        'You will need to provide basic details (name, email, phone number), upload a portfolio sample, and, for monetization requests, additional information like bank details, PAN card, and GST certificate (if applicable).',
    },
    {
      question: 'How long does the approval process take?',
      answer:
        'Approval typically takes 24-72 hours. You will be notified via email about the status of your registration.',
    },
    {
      question: 'Can I update my profile later?',
      answer:
        'Yes, you can edit your profile details and upload new photos anytime through your dashboard.',
    },
    {
      question: 'How do I upload my photos?',
      answer:
        "After logging into your account, navigate to the Upload New Photo section. Follow the guidelines to ensure your images meet the platform's requirements.",
    },
    {
      question: 'Are there specific guidelines for photo uploads?',
      answer:
        'Yes. Ensure your photos are high-resolution, watermark-free, and comply with the platform`s terms of service. For detailed guidelines, refer to the Photo Upload Guidelines section below the upload section.',
    },
    {
      question: 'How long does it take for my photos to be approved?',
      answer:
        'Photo approval typically takes 24-72 hours. Once approved, your images will be visible for sale on the platform if your profile is monetized.',
    },
    {
      question: 'What happens if my photo is rejected?',
      answer:
        'You will receive an email with the reason for rejection. You can make necessary edits or upload a different image for approval after 24 hours.',
    },
    {
      question: 'How do I apply for monetization?',
      answer:
        'Once your profile is approved, go to your dashboard and submit a monetization request. Ensure you provide all necessary information, including payment details.',
    },
    {
      question: 'What is the royalty model?',
      answer:
        'Basic Membership: 50% on digital downloads, 10% on print orders.Intermediate Membership: 70% on digital downloads, 10% on print orders.Premium Membership: 90% on digital downloads, 10% on print orders.',
    },
    {
      question: 'How will I receive my earnings?',
      answer:
        'Earnings will be credited to your registered bank account once they reach the minimum payout threshold. TDS and other applicable taxes will be deducted as per government norms.',
    },
    {
      question: 'Can I upgrade my membership?',
      answer:
        'Yes, you can upgrade to Intermediate or Premium membership from your dashboard to enjoy higher royalties and additional benefits.',
    },
    {
      question: 'What are the benefits of upgrading my membership?',
      answer:
        'Intermediate Membership: Higher royalties, advanced analytics, watermarking tools, and social media auto-posting.Premium Membership: Maximum royalties, priority support, marketing assistance, and additional visibility for your catalog.',
    },
    {
      question: 'Is there a trial period for paid memberships?',
      answer:
        'Yes, new users can enjoy a 1-month free trial of Premium membership. After the trial, you can choose to continue or switch to another plan.',
    },
    {
      question: 'Who owns the rights to the photos I upload?',
      answer:
        'You retain full ownership of your photos. By uploading them, you grant ClickedArt.com the right to sell and distribute them according to the licensing terms.',
    },
    {
      question: 'What licensing options are available?',
      answer:
        'You can choose between standard and extended licensing, depending on how you want your photos to be used. Details are available in the Licensing Terms section.',
    },
    {
      question: 'Can I remove my photos from the platform?',
      answer:
        'Yes, you can delete your photos from the platform at any time via your dashboard.',
    },
    {
      question: 'How do I get support for any issues?',
      answer: 'You can contact us via email at support@clickedart.com',
    },
    {
      question: 'Where can I track my sales and earnings?',
      answer:
        'All sales, earnings, and analytics are accessible through your personalized dashboard in your profile page.',
    },
    {
      question: 'What happens if I forget my password?',
      answer:
        'Use the Forgot Password option on the login page to reset your password.',
    },
  ];

  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <View style={style.backButtonContainer}>
          <BackButton />
        </View>
        <Text style={style.text}>FAQs</Text>
        <ScrollView>
          {faqs.map((faq, index) => (
            <Accordion key={index} title={faq.question} content={faq.answer} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingBottom: 70,
  },
container: {
    padding: 16,
    gap: 20,
    position: 'relative',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Outfit-bold',
    marginTop: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 25,
    left: 20,
  },
});

export default Faqs;
