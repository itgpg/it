# Maintainer Handover Checklist

If you are graduating or stepping down from your role as the lead student maintainer, you **must** complete this checklist to ensure the next maintainer can operate the site.

## 1. Access Transfer

Ensure the incoming maintainer receives access to the following:

- [ ] **GitHub Repository**: Add them as an Admin or Maintainer on the `itgpg/it` GitHub repository.
- [ ] **Google Cloud Console**: Introduce them to the managing faculty to get IAM access to the Google Cloud Project housing the API keys.
- [ ] **Google Drive**: Ensure their email is added as an **Editor** to the IT Department's root shared Drive folders (Certificates, Gallery, Study Materials, Newsletters).

## 2. Knowledge Transfer

Schedule a 30-minute handover meeting to review:
- [ ] **The Golden Rule**: Show them how to edit `_data/site_config.yml` and explicitly tell them to avoid editing JS/HTML files for content updates.
- [ ] **Documentation**: Walk them through the [MAINTAINING.md](../MAINTAINING.md) guide and the [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md).
- [ ] **Quotas**: Show them the Google Cloud Console dashboard and explain how API quotas work.

## 3. Account Cleanup

Once the incoming maintainer has full access and understanding:
- [ ] Remove yourself from the GitHub repository permissions.
- [ ] Ask the managing faculty to remove your IAM access from the Google Cloud Console.
- [ ] Remove your Editor access from the IT Department Drive folders.

Thank you for your service to the IT Department!
