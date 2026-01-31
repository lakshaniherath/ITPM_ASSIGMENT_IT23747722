const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
positive : [
  {
    "id": "Pos_Fun_0001",
    "name": "Simple greeting conversion",
    "inputLength": "S",
    "input": "oyaata suba dhavasak",
    "expected": "ඔයාට සුබ දවසක්",
    "type": "Greeting / request / response",
    "grammar": "Simple sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0002",
    "name": "Question with polite request",
    "inputLength": "S",
    "input": "karunaakaralaa mata eeka dhenna puLuvandha?",
    "expected": "කරුනාකරලා මට ඒක දෙන්න පුළුවන්ද?",
    "type": "Greeting / request / response",
    "grammar": "Interrogative (question)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0003",
    "name": "Mixed English + Singlish sentence",
    "inputLength": "M",
    "input": "apita heta campus eke final exam thiyenavaa api okkoma adha campus eke 10pm  venakan paadam karanavaa",
    "expected": "අපිට හෙට campus eke final exam තියෙනවා අපි ඔක්කොම අද campus eke 10pm  වෙනකන් පාඩම් කරනවා",
    "type": "Mixed Singlish + English",
    "grammar": "Compound sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Pos_Fun_0004",
    "name": "Past tense sentence",
    "inputLength": "S",
    "input": "mama iiyee kanna eliyata giyaa",
    "expected": "මම ඊයේ කන්න එලියට ගියා",
    "type": "Daily language usage",
    "grammar": "Past tense",
    "quality": "Real-time output update behavior"
  },
  {
    "id": "Pos_Fun_0005",
    "name": "Future tense with location",
    "inputLength": "S",
    "input": "api heta gamee yanavaa tika dhavasakata",
    "expected": "අපි හෙට ගමේ යනවා ටික දවසකට",
    "type": "Daily language usage",
    "grammar": "Future tense",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0006",
    "name": "Compound sentence with conjunction",
    "inputLength": "M",
    "input": "mama dhaen uyanavaa haebaeyi haal ivara nisaa dhaenma uyanna venne naee",
    "expected": "මම දැන් උයනවා හැබැයි හාල් ඉවර නිසා දැන්ම උයන්න වෙන්නෙ නෑ",
    "type": "Daily language usage",
    "grammar": "Compound sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0007",
    "name": "Complex conditional sentence",
    "inputLength": "M",
    "input": "oyaa maath ekka yanna enavanam maath oyaa ekka yanna enavaa",
    "expected": "ඔයා මාත් එක්ක යන්න එනවනම් මාත් ඔයා එක්ක යන්න එනවා",
    "type": "Daily language usage",
    "grammar": "Complex sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0008",
    "name": "imperative command",
    "inputLength": "S",
    "input": "vahaama beheth tika bonna",
    "expected": "වහාම බෙහෙත් ටික බොන්න",
    "type": "Daily language usage",
    "grammar": "Imperative (command)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0009",
    "name": "Negative sentence form",
    "inputLength": "M",
    "input": "mama ee tharagayata idhiripath velaa sindhu kiyanna kaemathi naee",
    "expected": "මම ඒ තරගයට ඉදිරිපත් වෙලා සින්දු කියන්න කැමති නෑ",
    "type": "Daily language usage",
    "grammar": "Negation (negative form)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0010",
    "name": "Informal phrasing",
    "inputLength": "S",
    "input": "ubata mokadha velaa thiyanne",
    "expected": "උබට මොකද වෙලා තියන්නෙ",
    "type": "Slang / informal language",
    "grammar": "Simple sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Pos_Fun_0011",
    "name": "Day-to-day expression",
    "inputLength": "S",
    "input": "mata godak thibahayi",
    "expected": "මට ගොඩක් තිබහයි",
    "type": "Daily language usage",
    "grammar": "Simple sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0012",
    "name": "Multi-word expression",
    "inputLength": "S",
    "input": "mata oonaa oyath  ekka chithrapatiyak balanna yanna",
    "expected": "මට ඕනා ඔයත්  එක්ක චිත්‍රපටියක් බලන්න යන්න",
    "type": "Word combination / phrase pattern",
    "grammar": "Complex sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0013",
    "name": "Repeated words for emphasis",
    "inputLength": "M",
    "input": "oyaala apee gedhara enakan bala bala hitiye aelata yanna",
    "expected": "ඔයාල අපේ ගෙදර එනකන් බල බල හිටියෙ ඇලට යන්න",
    "type": "Word combination / phrase pattern",
    "grammar": "Simple sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Pos_Fun_0014",
    "name": "Present tense work",
    "inputLength": "M",
    "input": "mama dhaen nangiva ekka enna panthiya lagata yanavaa",
    "expected": "මම දැන් නන්ගිව එක්ක එන්න පන්තිය ලගට යනවා",
    "type": "Daily language usage",
    "grammar": "Present tense",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0015",
    "name": "Negation pattern",
    "inputLength": "S",
    "input": "mata dhaen eeka karanna epaa velaa thiyanne",
    "expected": "මට දැන් ඒක කරන්න එපා වෙලා තියන්නෙ",
    "type": "Daily language usage",
    "grammar": "Negation (negative form)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0016",
    "name": "Singular pronoun usage",
    "inputLength": "M",
    "input": "oyaa apith ekka anuraaDhapurayee thiyena ruvanvaelisaeeya vadhinna yanna enavadha",
    "expected": "ඔයා අපිත් එක්ක අනුරාධපුරයේ තියෙන රුවන්වැලිසෑය වදින්න යන්න එනවද",
    "type": "Names / places / common English words",
    "grammar": "Interrogative (question)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0017",
    "name": "Plural pronoun usage",
    "inputLength": "S",
    "input": "api  eliyata gihin tikak aevidhalaa kaalaa emu",
    "expected": "අපි  එලියට ගිහින් ටිකක් ඇවිදලා කාලා එමු",
    "type": "Daily language usage",
    "grammar": "Plural form",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0018",
    "name": "Request with varying politeness",
    "inputLength": "S",
    "input": "karuNaakaralaa mata iiyee ugannapu dheeval kiyalaa dhenna puluvandha",
    "expected": "කරුණාකරලා මට ඊයේ උගන්නපු දේවල් කියලා දෙන්න පුලුවන්ද",
    "type": "Greeting / request / response",
    "grammar": "Complex sentence",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0019",
    "name": "English brand term embedded",
    "inputLength": "S",
    "input": "mama Whatsapp eken paNividayak evvaa eeka balanna",
    "expected": "මම Whatsapp එකෙන් පණිවිඩයක් එව්වා ඒක බලන්න",
    "type": "Mixed Singlish + English",
    "grammar": "Simple sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Pos_Fun_0020",
    "name": "Place name with English",
    "inputLength": "S",
    "input": "api gQQgaraame pansalata yamudha",
    "expected": "අපි ගංගරාමෙ පන්සලට යමුද",
    "type": "Names / places / common English words",
    "grammar": "Interrogative (question)",
    "quality": "Accuracy validation"
  },
  {
    "id": "Pos_Fun_0021",
    "name": "English abbreviation",
    "inputLength": "M",
    "input": "mama salli dhaanna hadhanakota OTP eka aavee nae monava velaadha kiyalaa theerenne naee",
    "expected": "මම සල්ලි දාන්න හදනකොට OTP එක ආවේ නැ මොනව වෙලාද කියලා තේරෙන්නෙ නෑ",
    "type": "Mixed Singlish + English",
    "grammar": "Complex sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Pos_Fun_0022",
    "name": "Punctuation test",
    "inputLength": "S",
    "input": "anee! ee balu paetiyaa harima hurathal",
    "expected": "අනේ! ඒ බලු පැටියා හරිම හුරතල්",
    "type": "Punctuation / numbers",
    "grammar": "Simple sentence",
    "quality": "Formatting preservation"
  },
  {
    "id": "Pos_Fun_0023",
    "name": "Currency and time format",
    "inputLength": "M",
    "input": "eeka dhaen Rs1000 k vage venavaa api heta 10 pm vage eeka ganna yamu needha",
    "expected": "ඒක දැන් Rs1000 ක් වගෙ වෙනවා අපි හෙට 10 pm වගෙ ඒක ගන්න යමු නේද",
    "type": "Punctuation / numbers",
    "grammar": "Compound sentence",
    "quality": "Formatting preservation"
  },
  {
    "id": "Pos_Fun_0024",
    "name": "Proper spacing test",
    "inputLength": "S",
    "input": "mama hodhata paadam karanavaa",
    "expected": "මම හොදට පාඩම් කරනවා",
    "type": "Formatting (spaces / line breaks / paragraph)",
    "grammar": "Simple sentence",
    "quality": "Formatting preservation"
  },
  {
    "id": "Pos_Fun_0025",
    "name": "Paragraph",
    "inputLength": "L",
    "input": "api paasalen aDhYAapana charikaavak yanna hitiye eeth mee koronaa vasaqqgathaya   pathiruna nisa apita  charikava yanna baeri unaa lamayi ekata godak dhuken hitiye ikmanata mee vasaqqgathaya naethivelaa yanna kiyalaa api haemooma praarThanaa karaa",
    "expected": "අපි පාසලෙන් අධ්‍යාපන චරිකාවක් යන්න හිටියෙ ඒත් මේ කොරොනා වසංගතය   පතිරුන නිස අපිට  චරිකව යන්න බැරි උනා ලමයි එකට ගොඩක් දුකෙන් හිටියෙ ඉක්මනට මේ වසංගතය නැතිවෙලා යන්න කියලා අපි හැමෝම ප්‍රාර්ථනා කරා",
    "type": "Formatting (spaces / line breaks / paragraph)",
    "grammar": "Complex sentence",
    "quality": "Robustness validation"
  }
],
negative : [
  {
    "id": "Neg_Fun_0001",
    "name": "English word conversion issue",
    "inputLength": "S",
    "input": "mataadhahavasayaaluvekennakivvaa",
    "expected": "මටඅදහවසයාලුවෙක්එන්නකිව්වා",
    "type": "Typographical error handling",
    "grammar": "Simple sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0002",
    "name": "English word conversion issue",
    "inputLength": "S",
    "input": "mama door eka vahala ennam oyaa yanna",
    "expected": "මම door එක වහල එන්නම් ඔයා යන්න",
    "type": "Mixed Singlish + English",
    "grammar": "Simple sentence",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0003",
    "name": "English phrase boundary issue",
    "inputLength": "S",
    "input": "oyaa in class test ekata laeesthi unaadha",
    "expected": "ඔයා in class test එකට ලෑස්ති උනාද",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0004",
    "name": "English compound word issue",
    "inputLength": "S",
    "input": "api giya hotel ekee swimming pool eka lassanayi needha",
    "expected": "අපි ගිය hotel එකේ swimming pool එක ලස්සනයි නේද",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0005",
    "name": "Technical term conversion issue",
    "inputLength": "S",
    "input": "oyaa karannee cyber security needha mata yaaluvek kivvaa",
    "expected": "ඔයා කරන්නේ cyber security නේද මට යාලුවෙක් කිව්වා",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0006",
    "name": "English mood word issue",
    "inputLength": "S",
    "input": "adha nam oyaa sad mood eken vagee inne",
    "expected": "අද නම් ඔයා sad mood එකෙන් වගේ ඉන්නේ",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0007",
    "name": "English phrase with 'is' issue",
    "inputLength": "S",
    "input": "his name is uthpala oyaagee nama mokakdha",
    "expected": "His name is උත්පල ඔයාගේ නම මොකක්ද",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0008",
    "name": "Color name conversion issue",
    "inputLength": "S",
    "input": "oyaata puluvandha mata green color shirt ekak thoorala dhenna",
    "expected": "ඔයාට පුලුවන්ද මට green color shirt එකක් තෝරල දෙන්න",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0009",
    "name": "English step word issue",
    "inputLength": "S",
    "input": "mata ee naetumee step tika kiyalaa dhenavadha",
    "expected": "මට ඒ නැටුමේ step ටික කියලා දෙනවද",
    "type": "Mixed Singlish + English",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0010",
    "name": "Proper spacing test",
    "inputLength": "S",
    "input": "this is diary eeka oyaata onedha",
    "expected": "this is diary ඒක ඔයාට ඕනෙද",
    "type": "Typographical error handling",
    "grammar": "Interrogative (question)",
    "quality": "Robustness validation"
  },
  {
    "id": "Neg_Fun_0011",
    "name": "Mixed language without spaces",
    "inputLength": "S",
    "input": "apiadhabadmintonplaykaramudha",
    "expected": "අපිඅදbadmintonplayකරමුද",
    "type": "Mixed Singlish + English",
    "grammar": "Simple sentence",
    "quality": "Real-time output update behavior"
  }
],
ui : [
  
  {
    "id": "Pos_UI_0001",
    "name": "Language selector - Sinhala",
    "inputLength": "S",
    "input": "Api yamu",
    "expected": "අපි යමු",
    "type": "Daily language usage",
    "grammar": "Simple sentence",
    "quality": "Real-time output update behavior"
  }
]
};


// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
test.describe('Negative Functional Tests', () => {
  for (const testCase of TEST_DATA.negative) {
    test(`${testCase.id} - ${testCase.name}`, async () => {
      const actualOutput = await translator.performTranslation(testCase.input);
      expect(actualOutput).toBe(testCase.expected);
      await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  }
});


  // UI Test
    // UI Test - SIMPLIFIED VERSION
  test.describe('UI Functionality Tests', () => {
    for (const testCase of TEST_DATA.ui) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });
});