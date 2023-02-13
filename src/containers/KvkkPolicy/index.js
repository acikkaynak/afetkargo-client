import { Grid, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const KvkkPolicy = () => {
  const navigate = useNavigate();

  return (
    <Grid>
      <Grid>
        <p>
          <strong>AYDINLATMA METNİ</strong>
        </p>
        <p>
          Bu uygulama, 6 Şubat 2023 tarihinde T&uuml;rkiye&rsquo;de meydana
          gelen b&uuml;y&uuml;k deprem felaketi i&ccedil;in ve sonra
          ger&ccedil;ekleşebilecek doğal afetlerde g&ouml;nderilecek yardım ve
          desteklerin koordinasyonunun sağlanması amacıyla ortak bir veri
          tabanında toplayarak yetkili kurum ve kuruluşlara aktarmak amacı ile
          bilişim teknolojileri alanında &ccedil;alışan
          g&ouml;n&uuml;ll&uuml;ler tarafından oluşturulmuştur.
        </p>
        <p>
          Taşıyıcının ve Alıcının adı, soyadı, iletişim bilgisi, konum bilgisi,
          taşıtın ve dorsenin plakası, taşınan envantere dair veriler iş
          faaliyetlerinin y&uuml;r&uuml;t&uuml;lmesi, lojistik faaliyetlerin
          y&uuml;r&uuml;t&uuml;lmesi, işlem g&uuml;venliğinin sağlanması
          amacıyla işlenmektedir.
        </p>
        <p>
          Toplanan kişisel veriler; yukarıda belirtilen ama&ccedil;ların
          ger&ccedil;ekleştirilmesi doğrultusunda 6698 sayılı Kişisel Verileri
          Koruma Kanunu&rsquo;n 8. ve 9. maddesi doğrultusunda yurt
          i&ccedil;inde ve yurt dışında mukim iş ortakları ile yetkili kamu
          kurum ve kuruluşları ile paylaşılabilecektir.
        </p>
        <p>
          Kişisel veri sahibi olarak Kanun&rsquo;un 11. maddesi uyarınca
          aşağıdaki haklara sahip olduğunuzu bildiririz:
        </p>
        <ol>
          <li>
            a) Kişisel veri işlenip işlenmediğini &ouml;ğrenme, b) Kişisel
            verileri işlenmişse buna ilişkin bilgi talep etme, c) Kişisel
            verilerin işlenme amacını ve bunların amacına uygun kullanılıp
            kullanılmadığını &ouml;ğrenme, &ccedil;) Yurt i&ccedil;inde veya
            yurt dışında kişisel verilerin aktarıldığı
            &uuml;&ccedil;&uuml;nc&uuml; kişileri bilme, d) Kişisel verilerin
            eksik veya yanlış işlenmiş olması h&acirc;linde bunların
            d&uuml;zeltilmesini isteme, e) 7 inci madde de
            &ouml;ng&ouml;r&uuml;len şartlar &ccedil;er&ccedil;evesinde kişisel
            verileri silinmesini veya yok edilmesini isteme, f) (d) ve (e)
            bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı
            &uuml;&ccedil;&uuml;nc&uuml; kişilere bildirilmesini isteme, g)
            İşlenen verilerin m&uuml;nhasıran otomatik sistemler vasıtasıyla
            analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun
            ortaya &ccedil;ıkmasına itiraz etme, ğ) Kişisel verilerin kanuna
            aykırı olarak işlenmesi sebebiyle zarara uğraması h&acirc;linde
            zararın giderilmesini talep etme.
          </li>
        </ol>
        <p>
          Yukarıda sıralanan haklarınıza y&ouml;nelik soru ve
          taleplerinizi,&rdquo; bilgi@afetkargo.com&rdquo; elektronik posta
          adresleri &uuml;zerinden tarafımıza iletebilirsiniz. Talebinizin
          niteliğine g&ouml;re en kısa s&uuml;rede ve en ge&ccedil; otuz
          g&uuml;n i&ccedil;inde başvurularınız &uuml;cretsiz olarak
          sonu&ccedil;landırılacaktır; ancak işlemin ayrıca bir maliyet
          gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından
          belirlenecek tarifeye g&ouml;re tarafınızdan &uuml;cret talep
          edilebilecektir. Talep edilen &uuml;cretin 5 iş g&uuml;n&uuml;
          i&ccedil;inde &ouml;denmemesi halinde tarafınızca oluşturulan talep
          ge&ccedil;ersiz sayılacaktır.
        </p>
        <p>
          Bu platform kar amacı g&uuml;tmeden imece usul&uuml; bilgi paylaşımı
          i&ccedil;in geliştirilmiş olup hi&ccedil;bir kurum ve kuruluş ile
          bağlantısı yoktur.
        </p>
        <p>
          Gerektiğinde yetkili merci ve kurumlara bilgi sağlanabilir ve iş
          birliği yapılabilir.
        </p>{" "}
      </Grid>
      <Grid>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Geri Dön
        </Button>
      </Grid>
    </Grid>
  );
};
export default KvkkPolicy;
