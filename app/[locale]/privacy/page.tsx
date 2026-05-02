import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  return { title: t("privacy") };
}

const content: Record<string, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: May 2025",
    sections: [
      { heading: "1. Overview", body: "ToolPit (toolpit.tech) provides free online tools. This Privacy Policy explains how we handle information when you use our services. We are committed to protecting your privacy." },
      { heading: "2. Data We Collect", body: "We do not collect any personal data. All tool operations (file conversions, generators, formatters) run entirely in your browser. No files or content you upload or enter are ever sent to our servers." },
      { heading: "3. Google AdSense & Cookies", body: "We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalised advertising by visiting Google's Ads Settings at g.co/adsettings." },
      { heading: "4. Analytics", body: "We may use anonymous analytics tools (such as Google Analytics) to understand how visitors use the site. This data is aggregated and does not identify individual users." },
      { heading: "5. Third-Party Links", body: "Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites." },
      { heading: "6. Children's Privacy", body: "ToolPit does not knowingly collect data from children under 13. If you believe a child has provided us with personal information, please contact us." },
      { heading: "7. Changes to This Policy", body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date." },
      { heading: "8. Contact", body: "If you have questions about this Privacy Policy, please contact us at erendiler1@gmail.com." },
    ],
  },
  tr: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: Mayıs 2025",
    sections: [
      { heading: "1. Genel Bakış", body: "ToolPit (toolpit.tech) ücretsiz çevrimiçi araçlar sunar. Bu Gizlilik Politikası, hizmetlerimizi kullanırken bilgilerin nasıl işlendiğini açıklar. Gizliliğinizi korumaya kararlıyız." },
      { heading: "2. Topladığımız Veriler", body: "Kişisel veri toplamıyoruz. Tüm araç işlemleri (dosya dönüştürme, üreticiler, formatlayıcılar) tamamen tarayıcınızda çalışır. Yüklediğiniz veya girdiğiniz hiçbir dosya ya da içerik sunucularımıza gönderilmez." },
      { heading: "3. Google AdSense ve Çerezler", body: "Reklam göstermek için Google AdSense kullanıyoruz. Google, sitemize veya diğer sitelere önceki ziyaretlerinize dayalı reklamlar sunmak için çerezler kullanabilir. g.co/adsettings adresinden kişiselleştirilmiş reklamları devre dışı bırakabilirsiniz." },
      { heading: "4. Analitik", body: "Ziyaretçilerin siteyi nasıl kullandığını anlamak için anonim analitik araçları (Google Analytics gibi) kullanabiliriz. Bu veriler birleştirilmiş olup bireysel kullanıcıları tanımlamaz." },
      { heading: "5. Üçüncü Taraf Bağlantılar", body: "Sitemiz harici web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından veya içeriklerinden sorumlu değiliz." },
      { heading: "6. Çocukların Gizliliği", body: "ToolPit, 13 yaşın altındaki çocuklardan bilerek veri toplamaz. Bir çocuğun kişisel bilgi sağladığını düşünüyorsanız lütfen bizimle iletişime geçin." },
      { heading: "7. Bu Politikadaki Değişiklikler", body: "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler güncellenmiş tarihle bu sayfada yayınlanacaktır." },
      { heading: "8. İletişim", body: "Bu Gizlilik Politikası hakkında sorularınız için erendiler1@gmail.com adresinden bizimle iletişime geçebilirsiniz." },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: مايو 2025",
    sections: [
      { heading: "1. نظرة عامة", body: "تقدم ToolPit أدوات مجانية عبر الإنترنت. تشرح سياسة الخصوصية هذه كيفية تعاملنا مع المعلومات عند استخدام خدماتنا. نحن ملتزمون بحماية خصوصيتك." },
      { heading: "2. البيانات التي نجمعها", body: "لا نجمع أي بيانات شخصية. تعمل جميع عمليات الأدوات بالكامل في متصفحك. لا يتم إرسال أي ملفات أو محتوى تقوم بتحميله أو إدخاله إلى خوادمنا." },
      { heading: "3. Google AdSense والكوكيز", body: "نستخدم Google AdSense لعرض الإعلانات. قد يستخدم Google ملفات تعريف الارتباط لعرض إعلانات بناءً على زياراتك السابقة. يمكنك إلغاء الاشتراك في g.co/adsettings." },
      { heading: "4. التحليلات", body: "قد نستخدم أدوات تحليل مجهولة لفهم كيفية استخدام الزوار للموقع. هذه البيانات مجمعة ولا تحدد هوية المستخدمين الفرديين." },
      { heading: "5. روابط الطرف الثالث", body: "قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية أو محتوى تلك المواقع." },
      { heading: "6. خصوصية الأطفال", body: "لا تجمع ToolPit بيانات من الأطفال دون سن 13 عامًا عن قصد. إذا كنت تعتقد أن طفلاً قدم لنا معلومات شخصية، يرجى الاتصال بنا." },
      { heading: "7. التغييرات على هذه السياسة", body: "قد نحدث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر التغييرات على هذه الصفحة بتاريخ محدث." },
      { heading: "8. التواصل", body: "إذا كان لديك أسئلة، يرجى التواصل معنا على erendiler1@gmail.com." },
    ],
  },
  es: {
    title: "Política de Privacidad",
    updated: "Última actualización: Mayo 2025",
    sections: [
      { heading: "1. Descripción general", body: "ToolPit proporciona herramientas gratuitas en línea. Esta Política de Privacidad explica cómo manejamos la información cuando usa nuestros servicios." },
      { heading: "2. Datos que recopilamos", body: "No recopilamos datos personales. Todas las operaciones se ejecutan completamente en su navegador. Ningún archivo o contenido que cargue se envía a nuestros servidores." },
      { heading: "3. Google AdSense y Cookies", body: "Usamos Google AdSense para mostrar anuncios. Google puede usar cookies basadas en sus visitas anteriores. Puede optar por no recibir anuncios personalizados en g.co/adsettings." },
      { heading: "4. Análisis", body: "Podemos usar herramientas de análisis anónimas para entender cómo los visitantes usan el sitio. Estos datos son agregados y no identifican usuarios individuales." },
      { heading: "5. Cambios en esta Política", body: "Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán en esta página con fecha actualizada." },
      { heading: "6. Contacto", body: "Si tiene preguntas sobre esta Política de Privacidad, contáctenos en erendiler1@gmail.com." },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    updated: "Letzte Aktualisierung: Mai 2025",
    sections: [
      { heading: "1. Übersicht", body: "ToolPit bietet kostenlose Online-Tools an. Diese Datenschutzerklärung erklärt, wie wir Informationen bei der Nutzung unserer Dienste behandeln." },
      { heading: "2. Daten, die wir erheben", body: "Wir erheben keine personenbezogenen Daten. Alle Tool-Operationen laufen vollständig in Ihrem Browser. Keine Dateien oder Inhalte werden an unsere Server gesendet." },
      { heading: "3. Google AdSense & Cookies", body: "Wir verwenden Google AdSense für Werbung. Google kann Cookies verwenden. Sie können personalisierte Werbung unter g.co/adsettings deaktivieren." },
      { heading: "4. Analyse", body: "Wir können anonyme Analyse-Tools verwenden, um zu verstehen, wie Besucher die Website nutzen. Diese Daten sind aggregiert und identifizieren keine einzelnen Nutzer." },
      { heading: "5. Änderungen dieser Richtlinie", body: "Wir können diese Datenschutzerklärung gelegentlich aktualisieren. Änderungen werden auf dieser Seite veröffentlicht." },
      { heading: "6. Kontakt", body: "Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns unter erendiler1@gmail.com." },
    ],
  },
  zh: {
    title: "隐私政策",
    updated: "最后更新：2025年5月",
    sections: [
      { heading: "1. 概述", body: "ToolPit 提供免费在线工具。本隐私政策说明我们在您使用我们服务时如何处理信息。" },
      { heading: "2. 我们收集的数据", body: "我们不收集任何个人数据。所有工具操作完全在您的浏览器中运行。您上传或输入的任何文件或内容都不会发送到我们的服务器。" },
      { heading: "3. Google AdSense 和 Cookie", body: "我们使用 Google AdSense 展示广告。Google 可能使用 Cookie 根据您之前的访问提供广告。您可以在 g.co/adsettings 选择退出个性化广告。" },
      { heading: "4. 分析", body: "我们可能使用匿名分析工具了解访问者如何使用网站。这些数据是汇总的，不会识别个人用户。" },
      { heading: "5. 政策变更", body: "我们可能会不时更新本隐私政策。更改将在此页面上发布并注明更新日期。" },
      { heading: "6. 联系方式", body: "如果您对本隐私政策有疑问，请通过 erendiler1@gmail.com 联系我们。" },
    ],
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = content[locale] ?? content.en;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <a href={`/${locale}`} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
      <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">{c.title}</h1>
      <p className="text-sm text-slate-400 mb-10">{c.updated}</p>

      <div className="space-y-8">
        {c.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-lg font-semibold text-slate-800 mb-2">{s.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-sm text-slate-600">
        📧 Contact: <a href="mailto:erendiler1@gmail.com" className="text-indigo-600 hover:underline">erendiler1@gmail.com</a>
      </div>
    </div>
  );
}
