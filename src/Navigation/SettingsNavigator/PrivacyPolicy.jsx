/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text, StyleSheet, View, SafeAreaView} from 'react-native';
import { useTheme } from 'src/themes/useTheme';

const PrivacyPolicy = () => {
  const policySections = [
    {
      title: '1. Information We Collect',
      items: [
        'Account Information: When you create an account, we collect your name, email address, password, postal address, and phone number.',
        'Photographer-Specific Information: Photographers may provide additional information, such as portfolio details, social media links, and payment information for transactions.',
        'Buyer-Specific Information: Buyers may provide payment details, order history, and preferences to facilitate purchases.',
        'Usage Data: We collect information about your interactions with our site, including IP addresses, browser types, device information, referral URLs, and pages visited.',
        'Cookies and Tracking Technologies: We use cookies, web beacons, and similar technologies to improve user experience and analyze website traffic.',
      ],
    },
    {
      title: '2. How We Use Your Information',
      items: [
        'Account Management: To create and manage your account, process transactions, and provide customer support.',
        'Communication: To send notifications, updates, and promotional materials, and to respond to inquiries.',
        'Personalization: To tailor content and advertisements to your interests and enhance your experience on our site.',
        'Legal Compliance: To comply with legal obligations and protect against fraudulent activities.',
      ],
    },
    {
      title: '3. Sharing Your Information',
      items: [
        'Service Providers: We share information with third-party vendors who assist with payment processing, data analysis, marketing, and customer service.',
        'Business Transfers: If we undergo a merger, acquisition, or asset sale, your information may be transferred.',
        'Legal Requirements: We may disclose information to comply with legal requests, protect our rights, and ensure user safety.',
        'Consent: We may share information for other purposes with your explicit consent.',
      ],
    },
    {
      title: '4. Data Security',
      items: [
        'We implement robust security measures to protect your information. However, no online platform is entirely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      title: '5. Your Privacy Rights',
      items: [
        'Access and Update: You can access and update your personal information through your account settings.',
        'Opt-Out: You can opt-out of receiving marketing communications by following the unsubscribe instructions in emails.',
        'Data Portability and Deletion: You may request a copy of your data or ask us to delete your information, subject to legal requirements.',
      ],
    },
    {
      title: '6. International Data Transfers',
      items: [
        'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.',
      ],
    },
    {
      title: "7. Children's Privacy",
      items: [
        'Our service is not intended for individuals under 16. We do not knowingly collect information from children. If we become aware of such data, we will take steps to delete it.',
      ],
    },
    {
      title: '8. Third-Party Websites',
      items: [
        'Our website may contain links to external sites. We are not responsible for the privacy practices of these websites.',
      ],
    },
    {
      title: '9. Changes to this Privacy Policy',
      items: [
        'We may update this Privacy Policy periodically. We will notify you of significant changes via email and/or a prominent notice on our website.',
      ],
    },
    {
      title: '10. Contact Us',
      items: [
        'For questions or concerns about this Privacy Policy, please contact us at:',
        'Email: support@clickedart.com',
      ],
    },
  ];

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 20}}>
        <Text style={styles.lastUpdated}>Effective Date: 26 January 2025</Text>
        <Text style={styles.introText}>
          Welcome to ClickedArt.com. We are committed to safeguarding the
          privacy of our users, including both buyers and photographers. This
          Privacy Policy outlines how we collect, use, disclose, and protect
          your information.
        </Text>

        {policySections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, idx) => (
              <Text key={idx} style={styles.bullet}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) =>  StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: theme.background,
    position: 'relative',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Outfit-bold',
    marginBottom: 10,
    color: theme.text,
    paddingVertical: 10,
  },
  lastUpdated: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  introText: {
    fontSize: 15,
    marginBottom: 20,
    color: theme.text,
    lineHeight: 22,
  },
  section: {
    gap: 4,
    paddingVertical: 16,
    borderBottomcolor: theme.text,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-bold',
    marginBottom: 10,
    color: theme.text,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 6,
    fontFamily: 'Outfit-medium',
    color: theme.text,
  },
});

export default PrivacyPolicy;
